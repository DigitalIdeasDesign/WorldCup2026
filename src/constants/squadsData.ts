export interface SquadPlayer {
  pos: 'GK' | 'DF' | 'MF' | 'FW';
  name: string;
  club: string;
}

export interface TeamSquad {
  country: string;
  coach: string;
  players: SquadPlayer[];
}

export const SQUADS_DATA: Record<string, TeamSquad> = {
  "algeria": {
    country: "Algeria",
    coach: "PETKOVIC Vladimir",
    players: [
      { pos: "GK", name: "MASTIL Melvin", club: "FC Stade Nyonnais" },
      { pos: "DF", name: "MANDI Aissa", club: "Lille OSC" },
      { pos: "DF", name: "AIT-NOURI Rayan", club: "Manchester City FC" },
      { pos: "DF", name: "BENSEBAINI Ramy", club: "Borussia Dortmund" },
      { pos: "MF", name: "AOUAR Houssem", club: "Al Ittihad" },
      { pos: "MF", name: "BENTALEB Nabil", club: "Lille OSC" },
      { pos: "FW", name: "MAHREZ Riyad", club: "Al Ahli" },
      { pos: "FW", name: "GOUIRI Amine", club: "Olympique Marseille" }
    ]
  },
  "argentina": {
    country: "Argentina",
    coach: "SCALONI Lionel",
    players: [
      { pos: "GK", name: "MARTINEZ Emiliano", club: "Aston Villa FC" },
      { pos: "DF", name: "ROMERO Cristian", club: "Tottenham Hotspur FC" },
      { pos: "DF", name: "MARTINEZ Lisandro", club: "Manchester United FC" },
      { pos: "MF", name: "DE PAUL Rodrigo", club: "Inter Miami CF" },
      { pos: "MF", name: "MAC ALLISTER Alexis", club: "Liverpool FC" },
      { pos: "MF", name: "FERNANDEZ Enzo", club: "Chelsea FC" },
      { pos: "FW", name: "MESSI Lionel", club: "Inter Miami CF" },
      { pos: "FW", name: "ALVAREZ Julian", club: "Atlético De Madrid" },
      { pos: "FW", name: "MARTINEZ Lautaro", club: "FC Internazionale Milano" }
    ]
  },
  "australia": {
    country: "Australia",
    coach: "POPOVIC Tony",
    players: [
      { pos: "GK", name: "RYAN Mathew", club: "Levante UD" },
      { pos: "DF", name: "SOUTTAR Harry", club: "Leicester City FC" },
      { pos: "DF", name: "DEGENEK Milos", club: "APOEL FC" },
      { pos: "MF", name: "IRVINE Jackson", club: "FC St. Pauli" },
      { pos: "MF", name: "METCALFE Connor", club: "FC St. Pauli" },
      { pos: "FW", name: "IRANKUNDA Nestory", club: "Watford FC" },
      { pos: "FW", name: "LECKIE Mathew", club: "Melbourne City FC" }
    ]
  },
  "austria": {
    country: "Austria",
    coach: "RANGNICK Ralf",
    players: [
      { pos: "GK", name: "SCHLAGER Alexander", club: "FC Red Bull Salzburg" },
      { pos: "DF", name: "ALABA David", club: "Real Madrid" },
      { pos: "DF", name: "DANSO Kevin", club: "Tottenham Hotspur" },
      { pos: "MF", name: "SABITZER Marcel", club: "Borussia Dortmund" },
      { pos: "MF", name: "LAIMER Konrad", club: "FC Bayern München" },
      { pos: "FW", name: "ARNAUTOVIC Marko", club: "FK Crvena Zvezda" },
      { pos: "FW", name: "GREGORITSCH Michael", club: "FC Augsburg" }
    ]
  },
  "belgium": {
    country: "Belgium",
    coach: "GARCIA Rudi",
    players: [
      { pos: "GK", name: "COURTOIS Thibaut", club: "Real Madrid" },
      { pos: "DF", name: "DEBAST Zeno", club: "Sporting CP" },
      { pos: "DF", name: "THEATE Arthur", club: "Eintracht Frankfurt" },
      { pos: "MF", name: "DE BRUYNE Kevin", club: "SSC Napoli" },
      { pos: "MF", name: "TIELEMANS Youri", club: "Aston Villa" },
      { pos: "FW", name: "LUKAKU Romelu", club: "SSC Napoli" },
      { pos: "FW", name: "TROSSARD Leandro", club: "Arsenal FC" },
      { pos: "FW", name: "DOKU Jeremy", club: "Manchester City" }
    ]
  },
  "bosnia and herzegovina": {
    country: "Bosnia and Herzegovina",
    coach: "BARBAREZ Sergej",
    players: [
      { pos: "GK", name: "VASILJ Nikola", club: "FC St. Pauli" },
      { pos: "DF", name: "KOLASINAC Sead", club: "Atalanta Bergamo" },
      { pos: "DF", name: "DEDIC Amar", club: "SL Benfica" },
      { pos: "MF", name: "TAHIROVIC Benjamin", club: "Brøndby IF" },
      { pos: "FW", name: "DZEKO Edin", club: "FC Schalke 04" },
      { pos: "FW", name: "DEMIROVIC Ermedin", club: "VfB Stuttgart" },
      { pos: "FW", name: "BAJRAKTAREVIC Esmir", club: "PSV Eindhoven" }
    ]
  },
  "brazil": {
    country: "Brazil",
    coach: "ANCELOTTI Carlo",
    players: [
      { pos: "GK", name: "ALISSON", club: "Liverpool FC" },
      { pos: "GK", name: "EDERSON", club: "Fenerbahçe SK" },
      { pos: "DF", name: "GABRIEL MAGALHAES", club: "Arsenal FC" },
      { pos: "DF", name: "MARQUINHOS", club: "Paris Saint-Germain" },
      { pos: "MF", name: "CASEMIRO", club: "Manchester United" },
      { pos: "MF", name: "BRUNO GUIMARAES", club: "Newcastle United" },
      { pos: "FW", name: "VINICIUS JUNIOR", club: "Real Madrid" },
      { pos: "FW", name: "NEYMAR JR", club: "Santos FC" },
      { pos: "FW", name: "RAPHINHA", club: "FC Barcelona" }
    ]
  },
  "cabo verde": {
    country: "Cabo Verde",
    coach: "BUBISTA Pedro",
    players: [
      { pos: "GK", name: "VOZINHA", club: "GD Chaves" },
      { pos: "DF", name: "LOGAN COSTA", club: "Villarreal CF" },
      { pos: "DF", name: "STOPIRA", club: "SCU Torreense" },
      { pos: "MF", name: "KEVIN PINA", club: "FC Krasnodar" },
      { pos: "MF", name: "JAMIRO MONTEIRO", club: "PEC Zwolle" },
      { pos: "FW", name: "RYAN MENDES", club: "Iğdır FK" },
      { pos: "FW", name: "JOVANE CABRAL", club: "CF Estrela Da Amadora" }
    ]
  },
  "canada": {
    country: "Canada",
    coach: "MARSCH Jesse",
    players: [
      { pos: "GK", name: "ST. CLAIR Dayne", club: "Inter Miami CF" },
      { pos: "DF", name: "DAVIES Alphonso", club: "FC Bayern München" },
      { pos: "DF", name: "JOHNSTON Alistair", club: "Celtic FC" },
      { pos: "MF", name: "EUSTAQUIO Stephen", club: "LAFC" },
      { pos: "MF", name: "OSORIO Jonathan", club: "Toronto FC" },
      { pos: "FW", name: "DAVID Jonathan", club: "Juventus FC" },
      { pos: "FW", name: "LARIN Cyle", club: "Southampton FC" }
    ]
  },
  "colombia": {
    country: "Colombia",
    coach: "LORENZO Nestor",
    players: [
      { pos: "GK", name: "OSPINA David", club: "Atlético Nacional" },
      { pos: "DF", name: "MUNOZ Daniel", club: "Crystal Palace" },
      { pos: "DF", name: "LUCUMI Jhon", club: "Bologna FC" },
      { pos: "MF", name: "JAMES RODRIGUEZ", club: "Minnesota United FC" },
      { pos: "MF", name: "RIOS Richard", club: "SL Benfica" },
      { pos: "FW", name: "DIAZ Luis", club: "FC Bayern München" },
      { pos: "FW", name: "CORDOBA Jhon", club: "FC Krasnodar" }
    ]
  },
  "congo dr": {
    country: "Congo DR",
    coach: "DESABRE Sebastien",
    players: [
      { pos: "GK", name: "MPASI Lionel", club: "Le Havre AC" },
      { pos: "DF", name: "WAN-BISSAKA Aaron", club: "West Ham United" },
      { pos: "DF", name: "MBEMBA Chancel", club: "Lille OSC" },
      { pos: "MF", name: "MUKAU Ngalayel", club: "Lille OSC" },
      { pos: "MF", name: "BONGONDA Theo", club: "FC Spartak Moscow" },
      { pos: "FW", name: "WISSA Yoane", club: "Newcastle United" },
      { pos: "FW", name: "BAKAMBU Cedric", club: "Real Betis" }
    ]
  },
  "côte d'ivoire": {
    country: "Côte d'Ivoire",
    coach: "FAE Emerse",
    players: [
      { pos: "GK", name: "FOFANA Yahia", club: "Çaykur Rizespor" },
      { pos: "DF", name: "DIOMANDE Ousmane", club: "Sporting CP" },
      { pos: "DF", name: "SINGO Wilfried", club: "Galatasaray SK" },
      { pos: "MF", name: "KESSIE Franck", club: "Al Ahli FC" },
      { pos: "MF", name: "FOFANA Seko", club: "FC Porto" },
      { pos: "FW", name: "ADINGRA Simon", club: "AS Monaco" },
      { pos: "FW", name: "PEPE Nicolas", club: "Villarreal CF" }
    ]
  },
  "croatia": {
    country: "Croatia",
    coach: "DALIC Zlatko",
    players: [
      { pos: "GK", name: "LIVAKOVIC Dominik", club: "GNK Dinamo Zagreb" },
      { pos: "DF", name: "GVARDIOL Josko", club: "Manchester City" },
      { pos: "DF", name: "STANISIC Josip", club: "FC Bayern München" },
      { pos: "MF", name: "MODRIC Luka", club: "AC Milan" },
      { pos: "MF", name: "KOVACIC Mateo", club: "Manchester City" },
      { pos: "FW", name: "KRAMARIC Andrej", club: "TSG Hoffenheim" },
      { pos: "FW", name: "PERISIC Ivan", club: "PSV Eindhoven" }
    ]
  },
  "curaçao": {
    country: "Curaçao",
    coach: "ADVOCAAT Dick",
    players: [
      { pos: "GK", name: "ROOM Eloy", club: "Miami FC" },
      { pos: "DF", name: "SAMBO Shurandy", club: "Sparta Rotterdam" },
      { pos: "MF", name: "BACUNA Juninho", club: "FC Volendam" },
      { pos: "MF", name: "CHONG Tahith", club: "Sheeld United FC" },
      { pos: "FW", name: "LOCADIA Juergen", club: "Miami FC" },
      { pos: "FW", name: "NOSLIN Tyrese", club: "SC Telstar" }
    ]
  },
  "czechia": {
    country: "Czechia",
    coach: "KOUBEK Miroslav",
    players: [
      { pos: "GK", name: "KOVAR Matej", club: "PSV Eindhoven" },
      { pos: "DF", name: "COUFAL Vladimir", club: "TSG Hoffenheim" },
      { pos: "DF", name: "ZIMA David", club: "SK Slavia Praha" },
      { pos: "MF", name: "SOUCEK Tomas", club: "West Ham United" },
      { pos: "FW", name: "SCHICK Patrik", club: "Bayer Leverkusen" },
      { pos: "FW", name: "HLOZEK Adam", club: "TSG Hoffenheim" }
    ]
  },
  "ecuador": {
    country: "Ecuador",
    coach: "BECCACECE Sebastian",
    players: [
      { pos: "GK", name: "GALINDEZ Hernan", club: "CA Huracán" },
      { pos: "DF", name: "ESTUPINAN Pervis", club: "AC Milan" },
      { pos: "DF", name: "HINCAPIE Piero", club: "Arsenal FC" },
      { pos: "MF", name: "CAICEDO Moises", club: "Chelsea FC" },
      { pos: "MF", name: "PAEZ Kendry", club: "CA River Plate" },
      { pos: "FW", name: "VALENCIA Enner", club: "CF Pachuca" },
      { pos: "FW", name: "PLATA Gonzalo", club: "CR Flamengo" }
    ]
  },
  "egypt": {
    country: "Egypt",
    coach: "HOSSAM HASSAN",
    players: [
      { pos: "GK", name: "MOHAMED ELSHENAWY", club: "Al Ahly FC" },
      { pos: "DF", name: "MOHAMED ABDELMONEIM", club: "OGC Nice" },
      { pos: "MF", name: "EMAM ASHOUR", club: "Al Ahly FC" },
      { pos: "FW", name: "MOHAMED SALAH", club: "Liverpool FC" },
      { pos: "FW", name: "OMAR MARMOUSH", club: "Manchester City FC" },
      { pos: "FW", name: "TREZEGUET", club: "Al Ahly FC" },
      { pos: "FW", name: "ZIZO", club: "Al Ahly FC" }
    ]
  },
  "england": {
    country: "England",
    coach: "TUCHEL Thomas",
    players: [
      { pos: "GK", name: "PICKFORD Jordan", club: "Everton FC" },
      { pos: "DF", name: "STONES John", club: "Manchester City" },
      { pos: "DF", name: "KONSA Ezri", club: "Aston Villa" },
      { pos: "MF", name: "RICE Declan", club: "Arsenal FC" },
      { pos: "MF", name: "BELLINGHAM Jude", club: "Real Madrid" },
      { pos: "FW", name: "KANE Harry", club: "FC Bayern München" },
      { pos: "FW", name: "SAKA Bukayo", club: "Arsenal FC" },
      { pos: "FW", name: "RASHFORD Marcus", club: "FC Barcelona" },
      { pos: "FW", name: "TONEY Ivan", club: "Al Ahli FC" }
    ]
  },
  "france": {
    country: "France",
    coach: "DESCHAMPS Didier",
    players: [
      { pos: "GK", name: "SAMBA Brice", club: "Stade Rennais" },
      { pos: "DF", name: "UPAMECANO Dayot", club: "FC Bayern München" },
      { pos: "DF", name: "KOUNDE Jules", club: "FC Barcelona" },
      { pos: "MF", name: "TCHOUAMENI Aurelien", club: "Real Madrid" },
      { pos: "MF", name: "KANTE Ngolo", club: "Fenerbahçe SK" },
      { pos: "FW", name: "MBAPPE Kylian", club: "Real Madrid" },
      { pos: "FW", name: "DEMBELE Ousmane", club: "Paris Saint-Germain" },
      { pos: "FW", name: "OLISE Michael", club: "FC Bayern München" }
    ]
  },
  "germany": {
    country: "Germany",
    coach: "NAGELSMANN Julian",
    players: [
      { pos: "GK", name: "NEUER Manuel", club: "FC Bayern München" },
      { pos: "DF", name: "RUEDIGER Antonio", club: "Real Madrid" },
      { pos: "DF", name: "KIMMICH Joshua", club: "FC Bayern München" },
      { pos: "MF", name: "WIRTZ Florian", club: "Liverpool FC" },
      { pos: "MF", name: "PAVLOVIC Aleksandar", club: "FC Bayern München" },
      { pos: "FW", name: "MUSIALA Jamal", club: "FC Bayern München" },
      { pos: "FW", name: "HAVERTZ Kai", club: "Arsenal FC" },
      { pos: "FW", name: "SANE Leroy", club: "Galatasaray SK" }
    ]
  },
  "ghana": {
    country: "Ghana",
    coach: "CARLOS QUEIROZ",
    players: [
      { pos: "GK", name: "ZIGI Lawrence Ati", club: "FC St. Gallen" },
      { pos: "DF", name: "SEIDU Alidu", club: "Stade Rennais" },
      { pos: "MF", name: "PARTEY Thomas", club: "Villarreal CF" },
      { pos: "MF", name: "SEMENYO Antoine", club: "Manchester City" },
      { pos: "FW", name: "WILLIAMS Inaki", club: "Athletic Club" },
      { pos: "FW", name: "ISSAHAKU Fatawu", club: "Leicester City" },
      { pos: "FW", name: "AYEW Jordan", club: "Leicester City" }
    ]
  },
  "haiti": {
    country: "Haiti",
    coach: "MIGNE Sebastien",
    players: [
      { pos: "GK", name: "PLACIDE Johny", club: "SC Bastia" },
      { pos: "DF", name: "ARCUS Carlens", club: "Angers SCO" },
      { pos: "DF", name: "DELCROIX Hannes", club: "FC Lugano" },
      { pos: "MF", name: "SAINTE Carl", club: "El Paso Locomotive" },
      { pos: "FW", name: "ETIENNE Derrick", club: "Toronto FC" },
      { pos: "FW", name: "DEEDSON Louicius", club: "FC Dallas" },
      { pos: "FW", name: "PIERROT Frantzdy", club: "Çaykur Rizespor" }
    ]
  },
  "ir iran": {
    country: "IR Iran",
    coach: "GHALEHNOY Amir",
    players: [
      { pos: "GK", name: "BEIRANVAND Alireza", club: "Tractor Sazi Tabriz" },
      { pos: "DF", name: "HARDANI Saleh", club: "Esteghlal Tehran" },
      { pos: "DF", name: "HAJISAFI Ehsan", club: "Sepahan SC" },
      { pos: "MF", name: "EZATOLAHI Saeid", club: "Shabab Al Ahli" },
      { pos: "MF", name: "GHODDOS Saman", club: "Al Ittihad Kalba" },
      { pos: "FW", name: "TAREMI Mehdi", club: "Olympiacos FC" },
      { pos: "FW", name: "GHAYEDI Mehdi", club: "Al Nasr SC" }
    ]
  },
  "iraq": {
    country: "Iraq",
    coach: "ARNOLD Graham",
    players: [
      { pos: "GK", name: "FAHAD TALIB", club: "Al Talaba SC" },
      { pos: "DF", name: "REBIN GHAREEB", club: "Port FC" },
      { pos: "DF", name: "ZAID TAHSEEN", club: "Pakhtakor Tashkent FK" },
      { pos: "MF", name: "ZIDANE IQBAL", club: "FC Utrecht" },
      { pos: "MF", name: "YOUSSEF AMYN", club: "AEK Larnaca" },
      { pos: "FW", name: "AYMEN HUSSEIN", club: "Al Karma SC" },
      { pos: "FW", name: "ALI ALHAMADI", club: "Luton Town" }
    ]
  },
  "japan": {
    country: "Japan",
    coach: "MORIYASU Hajime",
    players: [
      { pos: "GK", name: "SUZUKI Zion", club: "Parma" },
      { pos: "DF", name: "SUGAWARA Yukinari", club: "SV Werder Bremen" },
      { pos: "DF", name: "ITAKURA Kou", club: "AFC Ajax" },
      { pos: "MF", name: "ENDO Wataru", club: "Liverpool FC" },
      { pos: "MF", name: "KUBO Takefusa", club: "Real Sociedad" },
      { pos: "MF", name: "DOAN Ritsu", club: "Eintracht Frankfurt" },
      { pos: "FW", name: "MAEDA Daizen", club: "Celtic FC" },
      { pos: "FW", name: "UEDA Ayase", club: "Feyenoord Rotterdam" }
    ]
  },
  "jordan": {
    country: "Jordan",
    coach: "SELLAMI Jamal",
    players: [
      { pos: "GK", name: "YAZEED ABULAILA", club: "Al Hussein SC" },
      { pos: "DF", name: "ABDALLAH NASIB", club: "Al Zawra'a SC" },
      { pos: "DF", name: "HUSAM ABUDAHAB", club: "Al Faisaly SC" },
      { pos: "MF", name: "NIZAR ALRASHDAN", club: "Qatar SC" },
      { pos: "FW", name: "MOUSA ALTAMARI", club: "Stade Rennais" },
      { pos: "FW", name: "MAHMOUD ALMARDI", club: "Al Hussein SC" }
    ]
  },
  "korea republic": {
    country: "Korea Republic",
    coach: "HONG Myungbo",
    players: [
      { pos: "GK", name: "KIM Seunggyu", club: "FC Tokyo" },
      { pos: "DF", name: "KIM Minjae", club: "FC Bayern München" },
      { pos: "MF", name: "HWANG Inbeom", club: "Feyenoord Rotterdam" },
      { pos: "MF", name: "LEE Kangin", club: "Paris Saint-Germain" },
      { pos: "FW", name: "SON HEUNGMIN", club: "LAFC" },
      { pos: "FW", name: "CHO Guesung", club: "FC Midtjylland" },
      { pos: "FW", name: "HWANG Heechan", club: "Wolverhampton Wanderers" }
    ]
  },
  "mexico": {
    country: "Mexico",
    coach: "AGUIRRE Javier",
    players: [
      { pos: "GK", name: "OCHOA Guillermo", club: "AEL Limassol" },
      { pos: "DF", name: "SANCHEZ Jorge", club: "PAOK Saloniki" },
      { pos: "DF", name: "MONTES Cesar", club: "FC Lokomotiv" },
      { pos: "MF", name: "ALVAREZ Edson", club: "Fenerbahçe SK" },
      { pos: "MF", name: "ROMO Luis", club: "CD Guadalajara" },
      { pos: "FW", name: "GIMENEZ Santiago", club: "AC Milan" },
      { pos: "FW", name: "JIMENEZ Raul", club: "Fulham FC" }
    ]
  },
  "morocco": {
    country: "Morocco",
    coach: "OUAHBI Mohamed",
    players: [
      { pos: "GK", name: "BOUNOU Yassine", club: "Al Hilal SC" },
      { pos: "DF", name: "HAKIMI Achraf", club: "Paris Saint-Germain" },
      { pos: "DF", name: "MAZRAOUI Noussair", club: "Manchester United" },
      { pos: "MF", name: "AMRABAT Sofyan", club: "Real Betis" },
      { pos: "MF", name: "EL KHANNOUSS Bilal", club: "VfB Stuttgart" },
      { pos: "FW", name: "DIAZ Brahim", club: "Real Madrid" },
      { pos: "FW", name: "EL KAABI Ayoub", club: "Olympiacos FC" }
    ]
  },
  "netherlands": {
    country: "Netherlands",
    coach: "KOEMAN Ronald",
    players: [
      { pos: "GK", name: "VERBRUGGEN Bart", club: "Brighton & Hove Albion FC" },
      { pos: "DF", name: "VAN DIJK Virgil", club: "Liverpool FC" },
      { pos: "DF", name: "AKE Nathan", club: "Manchester City FC" },
      { pos: "MF", name: "GRAVENBERCH Ryan", club: "Liverpool FC" },
      { pos: "MF", name: "REIJNDERS Tijjani", club: "Manchester City FC" },
      { pos: "FW", name: "DEPAY Memphis", club: "SC Corinthians" },
      { pos: "FW", name: "GAKPO Cody", club: "Liverpool FC" },
      { pos: "FW", name: "WEGHORST Wout", club: "AFC Ajax" }
    ]
  },
  "new zealand": {
    country: "New Zealand",
    coach: "BAZELEY Darren",
    players: [
      { pos: "GK", name: "CROCOMBE Max", club: "Millwall FC" },
      { pos: "DF", name: "PAYNE Tim", club: "Wellington Phoenix" },
      { pos: "DF", name: "CACACE Liberato", club: "Wrexham AFC" },
      { pos: "MF", name: "STAMENIC Marko", club: "Swansea City AFC" },
      { pos: "FW", name: "WOOD Chris", club: "Nottingham Forest" },
      { pos: "FW", name: "BARBAROUSES Kosta", club: "WS Wanderers" }
    ]
  },
  "norway": {
    country: "Norway",
    coach: "SOLBAKKEN Stale",
    players: [
      { pos: "GK", name: "NYLAND Orjan", club: "Sevilla FC" },
      { pos: "DF", name: "AJER Kristoffer", club: "Brentford FC" },
      { pos: "DF", name: "OSTIGARD Leo", club: "Genoa CFC" },
      { pos: "MF", name: "ODEGAARD Martin", club: "Arsenal FC" },
      { pos: "MF", name: "BERG Patrick", club: "FK Bodø/Glimt" },
      { pos: "FW", name: "HAALAND Erling", club: "Manchester City FC" },
      { pos: "FW", name: "SORLOTH Alexander", club: "Atlético De Madrid" }
    ]
  },
  "panama": {
    country: "Panama",
    coach: "CHRISTIANSEN Thomas",
    players: [
      { pos: "GK", name: "MEJIA Luis", club: "Club Nacional" },
      { pos: "DF", name: "BLACKMAN Cesar", club: "ŠK Slovan Bratislava" },
      { pos: "DF", name: "CORDOBA Jose", club: "Norwich City" },
      { pos: "MF", name: "CARRASQUILLA Adalberto", club: "Pumas UNAM" },
      { pos: "MF", name: "RODRIGUEZ Jose Luis", club: "FC Juárez" },
      { pos: "FW", name: "FAJARDO Jose", club: "CD Universidad Católica" }
    ]
  },
  "paraguay": {
    country: "Paraguay",
    coach: "ALFARO Gustavo",
    players: [
      { pos: "GK", name: "FERNANDEZ Gatito", club: "Cerro Porteño" },
      { pos: "DF", name: "ALDERETE Omar", club: "Sunderland AFC" },
      { pos: "DF", name: "BALBUENA Fabian", club: "Grêmio FBPA" },
      { pos: "MF", name: "GOMEZ Diego", club: "Brighton & Hove Albion FC" },
      { pos: "MF", name: "ALMIRON Miguel", club: "Atlanta United FC" },
      { pos: "FW", name: "ENCISO Julio", club: "RC Strasbourg" },
      { pos: "FW", name: "SANABRIA Antonio", club: "US Cremonese" }
    ]
  },
  "portugal": {
    country: "Portugal",
    coach: "MARTINEZ Roberto",
    players: [
      { pos: "GK", name: "DIOGO COSTA", club: "FC Porto" },
      { pos: "DF", name: "RUBEN DIAS", club: "Manchester City" },
      { pos: "DF", name: "DIOGO DALOT", club: "Manchester United" },
      { pos: "MF", name: "BRUNO FERNANDES", club: "Manchester United" },
      { pos: "MF", name: "JOAO NEVES", club: "Paris Saint-Germain" },
      { pos: "FW", name: "CRISTIANO RONALDO", club: "Al Nassr FC" },
      { pos: "FW", name: "RAFAEL LEAO", club: "AC Milan" },
      { pos: "FW", name: "JOAO FELIX", club: "Al Nassr FC" }
    ]
  },
  "qatar": {
    country: "Qatar",
    coach: "LOPETEGUI Julen",
    players: [
      { pos: "GK", name: "MAHMOUD ABUNADA", club: "Al Rayyan SC" },
      { pos: "DF", name: "PEDRO MIGUEL", club: "Al Sadd SC" },
      { pos: "DF", name: "LUCAS MENDES", club: "Al Wakrah SC" },
      { pos: "MF", name: "AHMED ALGANEHI", club: "Al Gharafa SC" },
      { pos: "FW", name: "AKRAM AFIF", club: "Al Sadd SC" },
      { pos: "FW", name: "ALMOEZ ALI", club: "Al Duhail SC" }
    ]
  },
  "saudi arabia": {
    country: "Saudi Arabia",
    coach: "DONIS Georgios",
    players: [
      { pos: "GK", name: "NAWAF ALAQIDI", club: "Al Nassr FC" },
      { pos: "DF", name: "ALI LAJAMI", club: "Al Hilal SC" },
      { pos: "DF", name: "SAUD ABDULHAMID", club: "RC Lens" },
      { pos: "MF", name: "MOHAMED KANNO", club: "Al Hilal SC" },
      { pos: "FW", name: "SALEM ALDAWSARI", club: "Al Hilal SC" },
      { pos: "FW", name: "FERAS ALBRIKAN", club: "Al Ahli FC" }
    ]
  },
  "scotland": {
    country: "Scotland",
    coach: "CLARKE Steve",
    players: [
      { pos: "GK", name: "GUNN Angus", club: "Nottingham Forest" },
      { pos: "DF", name: "ROBERTSON Andy", club: "Liverpool FC" },
      { pos: "DF", name: "HICKEY Aaron", club: "Brentford FC" },
      { pos: "MF", name: "McTOMINAY Scott", club: "SSC Napoli" },
      { pos: "MF", name: "McGINN John", club: "Aston Villa" },
      { pos: "FW", name: "ADAMS Che", club: "Torino FC" }
    ]
  },
  "senegal": {
    country: "Senegal",
    coach: "THIAW Pape",
    players: [
      { pos: "GK", name: "DIOUF Yehvann", club: "OGC Nice" },
      { pos: "DF", name: "KOULIBALY Kalidou", club: "Al Hilal SC" },
      { pos: "DF", name: "SARR Mamadou", club: "Chelsea FC" },
      { pos: "MF", name: "GUEYE Idrissa Gana", club: "Everton FC" },
      { pos: "FW", name: "MANE Sadio", club: "Al Nassr FC" },
      { pos: "FW", name: "JACKSON Nicolas", club: "FC Bayern München" }
    ]
  },
  "south africa": {
    country: "South Africa",
    coach: "BROOS Hugo",
    players: [
      { pos: "GK", name: "WILLIAMS Ronwen", club: "Mamelodi Sundowns FC" },
      { pos: "DF", name: "MODIBA Aubrey", club: "Mamelodi Sundowns FC" },
      { pos: "MF", name: "MOKOENA Teboho", club: "Mamelodi Sundowns FC" },
      { pos: "FW", name: "FOSTER Lyle", club: "Burnley FC" },
      { pos: "FW", name: "APPOLLIS Oswin", club: "Orlando Pirates FC" },
      { pos: "FW", name: "MOFOKENG Relebohile", club: "Orlando Pirates FC" }
    ]
  },
  "spain": {
    country: "Spain",
    coach: "DE LA FUENTE Luis",
    players: [
      { pos: "GK", name: "RAYA David", club: "Arsenal FC" },
      { pos: "DF", name: "GRIMALDO Alex", club: "Bayer Leverkusen" },
      { pos: "MF", name: "RODRI", club: "Manchester City" },
      { pos: "MF", name: "PEDRI", club: "FC Barcelona" },
      { pos: "MF", name: "GAVI", club: "FC Barcelona" },
      { pos: "FW", name: "YAMAL Lamine", club: "FC Barcelona" },
      { pos: "FW", name: "WILLIAMS Nico", club: "Athletic Club" },
      { pos: "FW", name: "OLMO Dani", club: "FC Barcelona" }
    ]
  },
  "sweden": {
    country: "Sweden",
    coach: "POTTER Graham",
    players: [
      { pos: "GK", name: "JOHANSSON Viktor", club: "Stoke City FC" },
      { pos: "DF", name: "LINDELOF Victor", club: "Aston Villa FC" },
      { pos: "DF", name: "HIEN Isak", club: "Atalanta Bergamo" },
      { pos: "MF", name: "BERGVALL Lucas", club: "Tottenham Hotspur FC" },
      { pos: "FW", name: "ISAK Alexander", club: "Liverpool FC" },
      { pos: "FW", name: "GYOKERES Viktor", club: "Arsenal FC" }
    ]
  },
  "switzerland": {
    country: "Switzerland",
    coach: "YAKIN Murat",
    players: [
      { pos: "GK", name: "KOBEL Gregor", club: "Borussia Dortmund" },
      { pos: "DF", name: "AKANJI Manuel", club: "FC Internazionale Milano" },
      { pos: "DF", name: "WIDMER Silvan", club: "1. FSV Mainz 05" },
      { pos: "MF", name: "XHAKA Granit", club: "Sunderland AFC" },
      { pos: "MF", name: "ZAKARIA Denis", club: "AS Monaco" },
      { pos: "FW", name: "EMBOLO Breel", club: "Stade Rennais" },
      { pos: "FW", name: "NDOYE Dan", club: "Nottingham Forest" }
    ]
  },
  "tunisia": {
    country: "Tunisia",
    coach: "LAMOUCHI Sabri",
    players: [
      { pos: "GK", name: "CHAMAKH Mouhib", club: "Club Africain" },
      { pos: "DF", name: "ABDI Ali", club: "OGC Nice" },
      { pos: "DF", name: "TALBI Montassar", club: "FC Lorient" },
      { pos: "MF", name: "MEJBRI Hannibal", club: "Burnley FC" },
      { pos: "MF", name: "SKHIRI Ellyes", club: "Eintracht Frankfurt" },
      { pos: "FW", name: "ACHOURI Elias", club: "FC København" },
      { pos: "FW", name: "SAAD Elias", club: "Hannover 96" }
    ]
  },
  "türkiye": {
    country: "Türkiye",
    coach: "MONTELLA Vincenzo",
    players: [
      { pos: "GK", name: "GUNOK Mert", club: "Fenerbahçe SK" },
      { pos: "DF", name: "CELIK Zeki", club: "AS Roma" },
      { pos: "DF", name: "KADIOGLU Ferdi", club: "Brighton & Hove Albion FC" },
      { pos: "MF", name: "CALHANOGLU Hakan", club: "FC Internazionale Milano" },
      { pos: "FW", name: "GULER Arda", club: "Real Madrid" },
      { pos: "FW", name: "YILDIZ Kenan", club: "Juventus FC" },
      { pos: "FW", name: "YILMAZ Baris Alper", club: "Galatasaray SK" }
    ]
  },
  "uruguay": {
    country: "Uruguay",
    coach: "BIELSA Marcelo",
    players: [
      { pos: "GK", name: "ROCHET Sergio", club: "SC Internacional" },
      { pos: "DF", name: "GIMENEZ Jose Maria", club: "Atlético De Madrid" },
      { pos: "DF", name: "ARAUJO Ronald", club: "FC Barcelona" },
      { pos: "MF", name: "VALVERDE Federico", club: "Real Madrid" },
      { pos: "MF", name: "UGARTE Manuel", club: "Manchester United" },
      { pos: "FW", name: "NUNEZ Darwin", club: "Al Hilal SC" },
      { pos: "FW", name: "PELLISTRI Facundo", club: "Panathinaikos FC" }
    ]
  },
  "usa": {
    country: "USA",
    coach: "POCHETTINO Mauricio",
    players: [
      { pos: "GK", name: "TURNER Matt", club: "New England Revolution" },
      { pos: "DF", name: "DEST Sergino", club: "PSV Eindhoven" },
      { pos: "DF", name: "RICHARDS Chris", club: "Crystal Palace" },
      { pos: "MF", name: "ADAMS Tyler", club: "AFC Bournemouth" },
      { pos: "MF", name: "REYNA Giovanni", club: "Borussia Dortmund" },
      { pos: "MF", name: "McKENNIE Weston", club: "Juventus FC" },
      { pos: "FW", name: "PULISIC Christian", club: "AC Milan" },
      { pos: "FW", name: "PEPI Ricardo", club: "PSV Eindhoven" }
    ]
  },
  "uzbekistan": {
    country: "Uzbekistan",
    coach: "CANNAVARO Fabio",
    players: [
      { pos: "GK", name: "YUSUPOV Utkir", club: "PFC Navbahor Namangan" },
      { pos: "DF", name: "KHUSANOV Abdukodir", club: "Manchester City FC" },
      { pos: "DF", name: "ALIJONOV Khojiakbar", club: "Pakhtakor Tashkent FK" },
      { pos: "MF", name: "SHUKUROV Otabek", club: "Baniyas Club" },
      { pos: "MF", name: "XAMROBEKOV Odiljon", club: "Tractor Sazi Tabriz FC" },
      { pos: "FW", name: "SHOMURODOV Eldor", club: "Başakşehir FK" }
    ]
  }
};
