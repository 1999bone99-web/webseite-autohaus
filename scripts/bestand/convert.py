"""Wandelt die geladenen Detailseiten von www.bmw-jw-marhoffer.de in JSON für die Webseite um.
Aufruf über scripts/bestand/fetch.sh"""
import sys, re, html, json, os, collections

src, outdir = sys.argv[1], sys.argv[2]
idx = dict(l.split(' ', 1) for l in open(os.path.join(src, 'index.txt')).read().splitlines())

GROUPS = {'Komfort': 'Komfort', 'Unterhaltung/Media': 'Infotainment', 'Extras': 'Extras', 'Sicherheit': 'Sicherheit', 'Sonstiges': 'Sonstiges'}
BOILER = re.compile(r'(CO2 Umfang|Abgastechnik|EU-spezifisch|Spezifische Zusatz|Warndreieck|Sprachversion|Deutschland-Ausf|Bordliteratur|Kältemittel|Kaeltemittel|Ölwartung|COC|Steuerung|Dummy|Entfall|Kilometertacho|Dekodierung|Sondersteuerung|Adapter|Radschraubensicherung|Reifenpannenset|Notruf|Teleservices|Fußgängerschutz|Fussgängerschutz|Fußgänger-Schutz|Rekuperationssystem|8-fach|Exterieurumfänge|Interieurumfänge|Zusatzumf)', re.I)
# Hinweise im Inseratstext, die keine Ausstattung sind
PHOTOS_ON_REQUEST = re.compile(r'(bilder|pictures?|picures).*(mail)', re.I)
NOT_EQUIPMENT = re.compile(r'\b(EUR|Mwst|MwSt|TAX)\b')

HIGHLIGHT_RULES = [
    (r'Executive Lounge', 'Executive Lounge'),
    (r'Theatre Screen|Cinema', 'BMW Theatre Screen'),
    (r'M Sportpaket Pro|M SPORTPAKET PRO', 'M Sportpaket Pro'),
    (r'M Sportpaket', 'M Sportpaket'),
    (r'Sky Lounge|Panorama.*Sky', 'Panorama-Glasdach Sky Lounge'),
    (r'Panorama', 'Panorama-Glasdach'),
    (r'Bowers', 'Bowers & Wilkins'),
    (r'Luftfeder', 'Luftfederung'),
    (r'Massage', 'Massagefunktion'),
    (r'Sitzbelüftung|Sitzlüftung', 'Sitzbelüftung'),
    (r'Standheizung', 'Standheizung'),
    (r'Head-?Up', 'Head-Up Display'),
    (r'Laserlicht', 'BMW Laserlicht'),
    (r'Soft-?Close', 'Soft-Close'),
    (r'Anhängerkupplung|Anhaengerkupplung', 'Anhängerkupplung'),
    (r'Integral-?Aktivlenkung', 'Integral-Aktivlenkung'),
    (r'Driving Assistant Professional', 'Driving Assistant Professional'),
    (r'harman', 'harman/kardon'),
    (r'Merino', 'Leder Merino'),
    (r'Individual', 'BMW Individual'),
    (r'Akustikverglasung|Akustik-Verglasung', 'Akustikverglasung'),
]
COLOR_HEX = {'Schwarz': '#15171b', 'Grau': '#6f747a', 'Blau': '#1f3f7a', 'Weiß': '#eceef0', 'Grün': '#2f4a3a',
             'Rot': '#7a1a22', 'Silber': '#a7acb2', 'Braun': '#5a4334', 'Beige': '#c8b9a0', 'Gelb': '#d8b13a', 'Orange': '#b4572a'}

def num(s):
    return int(re.sub(r'\D', '', s)) if s and re.search(r'\d', s) else None

def slug(s):
    s = s.lower().replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def series(make, model):
    if make != 'BMW':
        return make.title() if make != 'MINI' else 'MINI'
    m = re.match(r'(\d)\d\d', model)
    if m:
        return f'{m.group(1)}er'
    m = re.match(r'M(\d)\d\d', model)
    if m:
        return f'{m.group(1)}er'
    return model.split()[0]

def headline(make, model, name, title):
    """'BMW 540' + 'd xDrive M-SportPro …' -> ('BMW 540d xDrive', 'M-SportPro …')"""
    if make != 'BMW':
        return name, title
    t = title.strip()
    if re.fullmatch(r'M?\d{3}', model):
        m = re.match(r'(xe|[dei])\s*(xDrive)?\s*', t)
        if m:
            head = f'{name}{m.group(1)}' + (' xDrive' if m.group(2) else '')
            return head, t[m.end():].strip()
        return name, t
    m = re.match(r'(M\d\d[ie]?|xDrive\s?\d\d[a-z]?|\d\d\s?[de]?|eDrive\d\d|\d\de)\s*(xDrive)?\s*', t)
    if m:
        engine = re.sub(r'\s+', '', m.group(1))
        head = f'{name} {engine}' + (' xDrive' if m.group(2) else '')
        return head, t[m.end():].strip()
    return name, t

vehicles, equipment, skipped = [], {}, []
for n, url in sorted(idx.items(), key=lambda x: int(x[0])):
    s = open(os.path.join(src, f'{n}.html'), encoding='utf-8').read()
    kwm = re.search(r'<meta name="keywords" content="([^"]*)"', s)
    if not kwm:
        skipped.append(url); continue
    kw = [html.unescape(k).strip() for k in kwm.group(1).split(',')]
    body = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', s, flags=re.S)
    lines = [l.strip() for l in html.unescape(re.sub(r'<[^>]+>', '\n', body)).split('\n') if l.strip()]

    def after(label):
        for i, l in enumerate(lines):
            if l == label:
                return lines[i + 1]
        return None

    make, model = kw[0], kw[1]
    title = re.sub(r'\s+', ' ', kw[2])
    price = next((num(k) for k in kw if k.endswith('€')), None)
    body_kw = next((k for k in kw if k in ('SUV / Geländewagen', 'Limousine', 'Coupe', 'Cabrio', 'Van', 'Kombi', 'Kleinwagen')), None)
    body_type = {'SUV / Geländewagen': 'suv', 'Coupe': 'coupe', 'Cabrio': 'coupe', 'Kombi': 'touring', 'Van': 'touring'}.get(body_kw, 'limousine')
    ad_id = after('Inserat-Nr.')
    power = after('Leistung:') or ''
    kw_val = num(power.split('kW')[0]) if 'kW' in power else None
    reg = after('Erstzulassung:') or ''
    m = re.match(r'(\d\d)/(\d{4})', reg)
    reg_iso = f'{m.group(2)}-{m.group(1)}' if m else None
    color = after('Farbe:') or ''

    # Ausstattung (Gruppen) bis "Verbrauch" bzw. "Fahrzeugbeschreibung"
    groups = collections.OrderedDict()
    if 'Ausstattung' in lines:
        i, cur = lines.index('Ausstattung') + 1, None
        while i < len(lines) and lines[i] not in ('Verbrauch', 'Fahrzeugbeschreibung'):
            l = lines[i]
            if l in GROUPS:
                cur = GROUPS[l]; groups[cur] = []
            elif cur:
                groups[cur].append(l)
            i += 1

    cons = co2 = co2cls = None
    if 'Energieverbrauch (kombiniert):' in lines:
        cons = after('Energieverbrauch (kombiniert):')
    if 'CO₂-Emissionen (kombiniert):' in lines:
        co2 = num(after('CO₂-Emissionen (kombiniert):'))
    if 'CO₂-Klasse:' in lines:
        co2cls = after('CO₂-Klasse:')

    desc = []
    if 'Fahrzeugbeschreibung' in lines:
        i = lines.index('Fahrzeugbeschreibung') + 1
        while i < len(lines) and lines[i] not in ('Anzeigen', 'Kontakt'):
            desc.append(lines[i]); i += 1
    msrp = None
    for l in desc:
        mm = re.search(r'(?:Listen)?[Nn]eupreis[^0-9]*([\d.]{5,})', l)
        if mm:
            v = num(mm.group(1))
            if v and price and v > price:
                msrp = v
            break
    if msrp is None:
        mm = re.search(r'(?:Neupreis|NP|neu)\s*([\d.]{6,})', title)
        if mm and price and num(mm.group(1)) > price:
            msrp = num(mm.group(1))
    photos_on_request = any(PHOTOS_ON_REQUEST.search(l) for l in desc + [title])
    special = []
    for l in desc:
        for part in (l.split('•') if '•' in l else ([l] if ',' not in l else l.split(',  '))):
            p = re.sub(r'^\s*[0-9A-Z]{4}\s+', '', part.strip()).strip(' ,')
            if (len(p) < 3 or len(p) > 90 or re.search(r'neupreis|Sonderausstattung', p, re.I) or BOILER.search(p)
                    or PHOTOS_ON_REQUEST.search(p) or NOT_EQUIPMENT.search(p)):
                continue
            if p not in special:
                special.append(p)

    haystack = ' | '.join([title] + special)
    highlights = []
    for pat, label in HIGHLIGHT_RULES:
        if re.search(pat, haystack, re.I) and label not in highlights:
            if label == 'M Sportpaket' and 'M Sportpaket Pro' in highlights:
                continue
            if label == 'Panorama-Glasdach' and 'Panorama-Glasdach Sky Lounge' in highlights:
                continue
            highlights.append(label)

    imgs = []
    for im in re.findall(r'src="(https://www\.webauto\.de/imgcars/[^"]+)"', s):
        im = im.split('?')[0]
        if im not in imgs:
            imgs.append(im)

    name = f'{make.title() if make not in ("BMW", "MINI") else make} {model}'
    head, trim = headline(make, model, name, title)
    vid = f'{slug(head)}-{slug(ad_id or n)}'
    vehicles.append(dict(
        id=vid, adId=ad_id, make=make, model=model, title=title,
        name=head, trim=trim,
        series=series(make, model), body=body_type, bodyLabel=body_kw,
        category=after('Fahrzeugart:'), price=price, msrp=msrp,
        firstRegistration=reg_iso, mileage=num(after('Kilometerstand:')), powerKw=kw_val,
        fuel=after('Kraftstoffart:'), transmission=after('Getriebe:'),
        color={'name': color, 'hex': COLOR_HEX.get(color, '#6f747a')},
        consumption=cons, co2=co2, co2Class=co2cls,
        highlights=highlights[:6], images=imgs, photosOnRequest=photos_on_request, sourceUrl=url,
    ))
    equipment[vid] = {'groups': [{'group': g, 'items': it} for g, it in groups.items() if it], 'special': special}

os.makedirs(outdir, exist_ok=True)
json.dump(vehicles, open(os.path.join(outdir, 'vehicles.json'), 'w'), ensure_ascii=False, indent=1)
json.dump(equipment, open(os.path.join(outdir, 'equipment.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
print(len(vehicles), 'Fahrzeuge, übersprungen:', skipped)
print('mit Fotos', sum(1 for v in vehicles if v['images']), 'mit UPE', sum(1 for v in vehicles if v['msrp']))
print('ohne km/preis/ez', [v['id'] for v in vehicles if not (v['mileage'] is not None and v['price'] and v['firstRegistration'])])
print('ids unique', len({v['id'] for v in vehicles}) == len(vehicles))
