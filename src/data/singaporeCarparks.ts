import { Carpark } from '../types/carpark';

export const INITIAL_CARPARKS: Carpark[] = [
  // CENTRAL / ORCHARD & DOWNTOWN
  {
    id: 'MALL-ION',
    carparkNo: 'ION-01',
    name: 'ION Orchard Car Park',
    address: '2 Orchard Turn',
    postalCode: '238801',
    region: 'Central',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3040,
    lng: 103.8318,
    gantryHeight: 2.05,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 142,
    totalLots: 500,
    vehicleLots: {
      C: { available: 142, total: 500 },
      Y: { available: 28, total: 60 }
    },
    evChargers: {
      count: 6,
      provider: 'SP Mobility',
      powerKw: '50kW DC / 22kW AC',
      pricePerKwh: '$0.65 / kWh'
    },
    rates: {
      weekdayDay: '$3.00 for 1st hr; $1.50 per next 30 mins (08:00 - 17:00)',
      weekdayNight: '$4.50 per entry (17:00 - 23:59)',
      weekendDay: '$4.00 for 1st hr; $2.00 per next 30 mins (08:00 - 18:00)',
      weekendNight: '$5.00 per entry (18:00 - 23:59)',
      perHourEstimate: 4.50,
      gracePeriodMinutes: 10
    },
    history: [180, 195, 210, 190, 160, 130, 95, 80, 75, 110, 142],
    lastUpdated: new Date().toISOString(),
    notes: 'Direct underground access to Orchard MRT. Best access via Paterson Road.'
  },
  {
    id: 'MALL-MBS',
    carparkNo: 'MBS-01',
    name: 'Marina Bay Sands (North & South)',
    address: '10 Bayfront Avenue',
    postalCode: '018956',
    region: 'Central',
    type: 'Commercial',
    agency: 'Private',
    lat: 1.2834,
    lng: 103.8607,
    gantryHeight: 2.00,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 310,
    totalLots: 1200,
    vehicleLots: {
      C: { available: 310, total: 1200 },
      Y: { available: 45, total: 120 }
    },
    evChargers: {
      count: 12,
      provider: 'Tesla Supercharger',
      powerKw: '250kW Supercharger',
      pricePerKwh: '$0.52 / kWh'
    },
    rates: {
      weekdayDay: '$14.00 for 1st hr; $1.50 per subsequent 30 mins (07:00 - 19:00)',
      weekdayNight: '$8.00 flat entry (19:00 - 07:00)',
      weekendDay: '$14.00 for 1st hr; $1.50 per subsequent 30 mins',
      weekendNight: '$8.00 flat entry (19:00 - 07:00)',
      perHourEstimate: 8.00,
      flatNightCap: '$8.00 flat after 7pm',
      gracePeriodMinutes: 15
    },
    history: [450, 410, 380, 340, 310, 290, 275, 295, 310],
    lastUpdated: new Date().toISOString(),
    notes: 'Max daily cap $32. Valet available at Hotel Tower 1 and Casino.'
  },
  {
    id: 'MALL-TAKASHIMAYA',
    carparkNo: 'NGEE-ANN',
    name: 'Ngee Ann City (Takashimaya)',
    address: '391 Orchard Road',
    postalCode: '238873',
    region: 'Central',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3023,
    lng: 103.8344,
    gantryHeight: 1.95,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 88,
    totalLots: 560,
    vehicleLots: {
      C: { available: 88, total: 560 },
      Y: { available: 16, total: 50 }
    },
    evChargers: {
      count: 4,
      provider: 'CDG ENGIE',
      powerKw: '22kW AC',
      pricePerKwh: '$0.62 / kWh'
    },
    rates: {
      weekdayDay: '$2.80 for 1st hr; $1.40 per next 30 mins (08:00 - 17:00)',
      weekdayNight: '$4.20 per entry (17:00 - 23:59)',
      weekendDay: '$4.20 for 1st hr; $1.80 per next 30 mins',
      weekendNight: '$4.80 per entry (18:00 - 23:59)',
      perHourEstimate: 4.20,
      gracePeriodMinutes: 10
    },
    history: [140, 120, 110, 95, 88, 80, 85, 90, 88],
    lastUpdated: new Date().toISOString(),
    notes: 'Enter via Orchard Turn or Takashimaya drop-off lane.'
  },
  {
    id: 'MALL-SUNTEC',
    carparkNo: 'SUNTEC-01',
    name: 'Suntec City Mall & Convention',
    address: '3 Temasek Boulevard',
    postalCode: '038983',
    region: 'Central',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.2934,
    lng: 103.8572,
    gantryHeight: 2.00,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 620,
    totalLots: 3100,
    vehicleLots: {
      C: { available: 620, total: 3100 },
      Y: { available: 110, total: 300 }
    },
    evChargers: {
      count: 14,
      provider: 'SP Mobility',
      powerKw: '60kW DC / 22kW AC',
      pricePerKwh: '$0.66 / kWh'
    },
    rates: {
      weekdayDay: '$2.40 for 1st hr; $1.20 per next 30 mins (07:00 - 17:00)',
      weekdayNight: '$3.20 per entry (17:00 - 07:00)',
      weekendDay: '$2.60 for 1st 4 hrs; $1.20 per next hr (07:00 - 17:00)',
      weekendNight: '$3.20 per entry (17:00 - 07:00)',
      perHourEstimate: 2.80,
      flatNightCap: '$3.20 per entry after 5pm',
      gracePeriodMinutes: 10
    },
    history: [820, 750, 690, 640, 620, 600, 610, 620],
    lastUpdated: new Date().toISOString(),
    notes: 'Color-coded zones: Yellow (Tower 1/2), Green (Tower 3/4), Red (Tower 5).'
  },
  {
    id: 'MALL-VIVO',
    carparkNo: 'VIVO-01',
    name: 'VivoCity & HarbourFront Carpark',
    address: '1 HarbourFront Walk',
    postalCode: '098585',
    region: 'Central',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.2644,
    lng: 103.8222,
    gantryHeight: 2.10,
    carparkSystem: 'Multi-storey',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 412,
    totalLots: 2000,
    vehicleLots: {
      C: { available: 412, total: 2000 },
      Y: { available: 52, total: 180 }
    },
    evChargers: {
      count: 8,
      provider: 'Shell Recharge',
      powerKw: '50kW DC',
      pricePerKwh: '$0.68 / kWh'
    },
    rates: {
      weekdayDay: '$1.60 for 1st hr; $0.80 per next 30 mins (07:00 - 18:00)',
      weekdayNight: '$3.50 per entry (18:00 - 04:00)',
      weekendDay: '$2.00 for 1st hr; $1.00 per next 30 mins (07:00 - 18:00)',
      weekendNight: '$4.00 per entry (18:00 - 04:00)',
      perHourEstimate: 2.40,
      flatNightCap: '$3.50 per entry after 6pm',
      gracePeriodMinutes: 15
    },
    history: [590, 520, 480, 430, 412, 395, 405, 412],
    lastUpdated: new Date().toISOString(),
    notes: 'Direct connection to Sentosa Express monorail and boardwalk.'
  },
  {
    id: 'MALL-BUGIS',
    carparkNo: 'BUGIS-01',
    name: 'Bugis Junction & Bugis+',
    address: '200 Victoria Street',
    postalCode: '188021',
    region: 'Central',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3001,
    lng: 103.8552,
    gantryHeight: 1.95,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 95,
    totalLots: 640,
    vehicleLots: {
      C: { available: 95, total: 640 },
      Y: { available: 20, total: 70 }
    },
    evChargers: {
      count: 4,
      provider: 'Charge+',
      powerKw: '22kW AC',
      pricePerKwh: '$0.60 / kWh'
    },
    rates: {
      weekdayDay: '$2.20 for 1st hr; $1.10 per next 30 mins (08:00 - 18:00)',
      weekdayNight: '$3.30 per entry (18:00 - 23:59)',
      weekendDay: '$2.50 for 1st hr; $1.30 per next 30 mins',
      weekendNight: '$3.50 per entry',
      perHourEstimate: 2.70,
      gracePeriodMinutes: 10
    },
    history: [150, 130, 115, 100, 95, 90, 92, 95],
    lastUpdated: new Date().toISOString(),
    notes: 'Access from Victoria Street or Middle Road.'
  },
  {
    id: 'COMM-ORQ',
    carparkNo: 'ORQ-CBD',
    name: 'One Raffles Quay (CBD)',
    address: '1 Raffles Quay',
    postalCode: '048583',
    region: 'Central',
    type: 'Commercial',
    agency: 'Private',
    lat: 1.2818,
    lng: 103.8524,
    gantryHeight: 2.10,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 112,
    totalLots: 320,
    vehicleLots: {
      C: { available: 112, total: 320 }
    },
    evChargers: {
      count: 6,
      provider: 'SP Mobility',
      powerKw: '22kW AC',
      pricePerKwh: '$0.64 / kWh'
    },
    rates: {
      weekdayDay: '$3.50 per 30 mins (07:00 - 17:00)',
      weekdayNight: '$4.00 per entry (17:00 - 07:00 next day)',
      weekendDay: '$4.00 per entry (07:00 - 07:00 next day)',
      weekendNight: '$4.00 per entry',
      perHourEstimate: 7.00,
      flatNightCap: '$4.00 entry after 5pm',
      gracePeriodMinutes: 10
    },
    history: [160, 140, 120, 115, 112, 108, 112],
    lastUpdated: new Date().toISOString(),
    notes: 'High clearance 2.1m. Convenient for Marina Bay Financial Centre.'
  },
  {
    id: 'COMM-GUOCO',
    carparkNo: 'GUOCO-TP',
    name: 'Guoco Tower Tanjong Pagar',
    address: '1 Wallich Street',
    postalCode: '078881',
    region: 'Central',
    type: 'Commercial',
    agency: 'Private',
    lat: 1.2768,
    lng: 103.8458,
    gantryHeight: 2.15,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 168,
    totalLots: 480,
    vehicleLots: {
      C: { available: 168, total: 480 },
      Y: { available: 32, total: 80 }
    },
    evChargers: {
      count: 8,
      provider: 'CDG ENGIE',
      powerKw: '50kW DC / 22kW AC',
      pricePerKwh: '$0.64 / kWh'
    },
    rates: {
      weekdayDay: '$3.20 per 30 mins (07:00 - 18:00)',
      weekdayNight: '$3.80 per entry (18:00 - 07:00)',
      weekendDay: '$3.80 per entry (07:00 - 07:00 next day)',
      weekendNight: '$3.80 per entry',
      perHourEstimate: 6.40,
      flatNightCap: '$3.80 entry after 6pm',
      gracePeriodMinutes: 10
    },
    history: [210, 190, 175, 168, 160, 168],
    lastUpdated: new Date().toISOString(),
    notes: 'Above Tanjong Pagar MRT. Direct expressway link to AYE & MCE.'
  },

  // HDB CENTRAL AREA (Real HDB Carpark Codes matching Data.gov.sg API)
  {
    id: 'HDB-ACB',
    carparkNo: 'ACB',
    name: 'Block 265 - 271 Bishan St 24 (MSCP)',
    address: 'Blk 265 Bishan Street 24',
    postalCode: '570265',
    region: 'Central',
    type: 'HDB',
    agency: 'HDB',
    lat: 1.3582,
    lng: 103.8455,
    gantryHeight: 2.15,
    carparkSystem: 'Multi-storey',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'SUN & PH ONLY',
    lotsAvailable: 185,
    totalLots: 420,
    vehicleLots: {
      C: { available: 185, total: 420 },
      Y: { available: 42, total: 80 }
    },
    evChargers: {
      count: 3,
      provider: 'CDG ENGIE',
      powerKw: '22kW AC',
      pricePerKwh: '$0.58 / kWh'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (07:00 - 22:30)',
      weekdayNight: '$0.60 per 30 mins (Max $5.00 night cap)',
      weekendDay: 'Free Parking on Sunday & PH (07:30 - 22:30)',
      weekendNight: '$0.60 per 30 mins (Max $5.00 night cap)',
      perHourEstimate: 1.20,
      flatNightCap: '$5.00 max (22:30 - 07:00)',
      freeParkingRule: 'Free on Sundays & PH (7:30am - 10:30pm)',
      gracePeriodMinutes: 10
    },
    history: [220, 210, 195, 185, 170, 185],
    lastUpdated: new Date().toISOString(),
    notes: 'Standard HDB Central area. Sunday Free Parking Scheme applicable.'
  },
  {
    id: 'HDB-BA12',
    carparkNo: 'BA12',
    name: 'Block 165 - 173 Toa Payoh Lorong 1',
    address: 'Blk 165 Toa Payoh Lor 1',
    postalCode: '310165',
    region: 'Central',
    type: 'HDB',
    agency: 'HDB',
    lat: 1.3326,
    lng: 103.8431,
    gantryHeight: 2.10,
    carparkSystem: 'Multi-storey',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'SUN & PH ONLY',
    lotsAvailable: 230,
    totalLots: 510,
    vehicleLots: {
      C: { available: 230, total: 510 },
      Y: { available: 55, total: 90 }
    },
    evChargers: {
      count: 4,
      provider: 'SP Mobility',
      powerKw: '22kW AC',
      pricePerKwh: '$0.59 / kWh'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (07:00 - 22:30)',
      weekdayNight: '$0.60 per 30 mins (Max $5.00 night cap)',
      weekendDay: 'Free Parking on Sunday & PH (07:30 - 22:30)',
      weekendNight: '$0.60 per 30 mins (Max $5.00 cap)',
      perHourEstimate: 1.20,
      flatNightCap: '$5.00 max night cap',
      freeParkingRule: 'Free on Sundays & PH',
      gracePeriodMinutes: 10
    },
    history: [260, 245, 235, 230, 220, 230],
    lastUpdated: new Date().toISOString(),
    notes: 'Next to Toa Payoh West Community Club & Food Centre.'
  },

  // EAST REGION
  {
    id: 'MALL-JEWEL',
    carparkNo: 'JEWEL-01',
    name: 'Jewel Changi Airport (General Carpark)',
    address: '78 Airport Boulevard',
    postalCode: '819666',
    region: 'East',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3602,
    lng: 103.9897,
    gantryHeight: 2.10,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 540,
    totalLots: 2500,
    vehicleLots: {
      C: { available: 540, total: 2500 },
      Y: { available: 75, total: 200 }
    },
    evChargers: {
      count: 10,
      provider: 'Shell Recharge',
      powerKw: '120kW DC Ultra-Fast / 22kW AC',
      pricePerKwh: '$0.67 / kWh'
    },
    rates: {
      weekdayDay: '$0.04 per min ($2.40/hr) for 1st 90 mins; $5.00/hr thereafter',
      weekdayNight: '$0.04 per min ($2.40/hr)',
      weekendDay: '$0.04 per min ($2.40/hr) 1st 90 mins; $5.00/hr thereafter',
      weekendNight: '$0.04 per min ($2.40/hr)',
      perHourEstimate: 2.40,
      gracePeriodMinutes: 10
    },
    history: [710, 640, 580, 540, 520, 540],
    lastUpdated: new Date().toISOString(),
    notes: 'B3 - B5 general parking. Direct walk into Jewel Rain Vortex & T1.'
  },
  {
    id: 'MALL-TAMPINES',
    carparkNo: 'TAMP-01',
    name: 'Tampines Mall & Century Square',
    address: '4 Tampines Central 5',
    postalCode: '529510',
    region: 'East',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3533,
    lng: 103.9452,
    gantryHeight: 1.95,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 64,
    totalLots: 620,
    vehicleLots: {
      C: { available: 64, total: 620 },
      Y: { available: 18, total: 50 }
    },
    evChargers: {
      count: 4,
      provider: 'SP Mobility',
      powerKw: '22kW AC',
      pricePerKwh: '$0.62 / kWh'
    },
    rates: {
      weekdayDay: '$1.80 for 1st hr; $0.50 per next 15 mins (06:00 - 18:00)',
      weekdayNight: '$2.80 per entry (18:00 - 05:59)',
      weekendDay: '$2.40 for 1st hr; $0.60 per next 15 mins',
      weekendNight: '$3.00 per entry (18:00 - 05:59)',
      perHourEstimate: 2.20,
      flatNightCap: '$2.80 per entry after 6pm',
      gracePeriodMinutes: 10
    },
    history: [110, 95, 78, 64, 55, 64],
    lastUpdated: new Date().toISOString(),
    notes: 'High traffic during dinner hours. Next to Tampines MRT Interchange.'
  },
  {
    id: 'HDB-TM39',
    carparkNo: 'TM39',
    name: 'Block 201 - 209 Tampines Street 21 (MSCP)',
    address: 'Blk 201A Tampines St 21',
    postalCode: '521201',
    region: 'East',
    type: 'HDB',
    agency: 'HDB',
    lat: 1.3538,
    lng: 103.9515,
    gantryHeight: 2.15,
    carparkSystem: 'Multi-storey',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'SUN & PH ONLY',
    lotsAvailable: 312,
    totalLots: 560,
    vehicleLots: {
      C: { available: 312, total: 560 },
      Y: { available: 62, total: 95 },
      H: { available: 8, total: 15 }
    },
    evChargers: {
      count: 3,
      provider: 'Charge+',
      powerKw: '22kW AC',
      pricePerKwh: '$0.58 / kWh'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (07:00 - 22:30)',
      weekdayNight: '$0.60 per 30 mins (Max $5.00 cap)',
      weekendDay: 'Free on Sundays & PH (07:30 - 22:30)',
      weekendNight: '$0.60 per 30 mins (Max $5.00 cap)',
      perHourEstimate: 1.20,
      flatNightCap: '$5.00 max cap',
      freeParkingRule: 'Free on Sundays & PH',
      gracePeriodMinutes: 10
    },
    history: [350, 335, 320, 312, 305, 312],
    lastUpdated: new Date().toISOString(),
    notes: 'Spacious MSCP near Tampines 201 market and hawker centre.'
  },
  {
    id: 'MALL-BEDOK',
    carparkNo: 'BDK-01',
    name: 'Bedok Mall & Bus Interchange',
    address: '311 New Upper Changi Road',
    postalCode: '467360',
    region: 'East',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3248,
    lng: 103.9295,
    gantryHeight: 2.00,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 118,
    totalLots: 450,
    vehicleLots: {
      C: { available: 118, total: 450 },
      Y: { available: 25, total: 60 }
    },
    evChargers: {
      count: 4,
      provider: 'SP Mobility',
      powerKw: '22kW AC',
      pricePerKwh: '$0.62 / kWh'
    },
    rates: {
      weekdayDay: '$1.80 for 1st hr; $0.50 per next 15 mins (06:00 - 18:00)',
      weekdayNight: '$2.50 per entry (18:00 - 05:59)',
      weekendDay: '$2.20 for 1st hr; $0.60 per next 15 mins',
      weekendNight: '$2.80 per entry',
      perHourEstimate: 2.10,
      flatNightCap: '$2.50 flat after 6pm',
      gracePeriodMinutes: 10
    },
    history: [180, 150, 130, 118, 110, 118],
    lastUpdated: new Date().toISOString(),
    notes: 'Direct underground connection to Bedok MRT.'
  },

  // WEST REGION
  {
    id: 'MALL-JEM',
    carparkNo: 'JEM-01',
    name: 'Jem & Westgate Jurong Gateway',
    address: '50 Jurong Gateway Road',
    postalCode: '608549',
    region: 'West',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3332,
    lng: 103.7434,
    gantryHeight: 2.10,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 156,
    totalLots: 980,
    vehicleLots: {
      C: { available: 156, total: 980 },
      Y: { available: 34, total: 90 }
    },
    evChargers: {
      count: 6,
      provider: 'CDG ENGIE',
      powerKw: '50kW DC / 22kW AC',
      pricePerKwh: '$0.64 / kWh'
    },
    rates: {
      weekdayDay: '$1.80 for 1st hr; $0.50 per next 15 mins (06:00 - 18:00)',
      weekdayNight: '$2.80 per entry (18:00 - 05:59)',
      weekendDay: '$2.20 for 1st hr; $0.60 per next 15 mins',
      weekendNight: '$3.00 per entry',
      perHourEstimate: 2.20,
      flatNightCap: '$2.80 flat after 6pm',
      gracePeriodMinutes: 10
    },
    history: [240, 210, 180, 156, 140, 156],
    lastUpdated: new Date().toISOString(),
    notes: 'Major hub near Jurong East MRT. Direct linkway to Ng Teng Fong General Hospital.'
  },
  {
    id: 'MALL-JURONGPOINT',
    carparkNo: 'JP-01',
    name: 'Jurong Point Shopping Centre (JP1 & JP2)',
    address: '1 Jurong West Central 2',
    postalCode: '648886',
    region: 'West',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3403,
    lng: 103.7061,
    gantryHeight: 2.00,
    carparkSystem: 'Multi-storey',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 280,
    totalLots: 1400,
    vehicleLots: {
      C: { available: 280, total: 1400 },
      Y: { available: 48, total: 120 }
    },
    evChargers: {
      count: 6,
      provider: 'SP Mobility',
      powerKw: '22kW AC',
      pricePerKwh: '$0.63 / kWh'
    },
    rates: {
      weekdayDay: '$1.50 for 1st hr; $0.50 per next 15 mins (07:00 - 17:00)',
      weekdayNight: '$2.20 per entry (17:00 - 07:00)',
      weekendDay: '$2.00 for 1st 2 hrs; $0.50 per next 15 mins',
      weekendNight: '$2.50 per entry',
      perHourEstimate: 1.80,
      flatNightCap: '$2.20 flat after 5pm',
      gracePeriodMinutes: 10
    },
    history: [390, 340, 310, 280, 260, 280],
    lastUpdated: new Date().toISOString(),
    notes: 'Largest suburban mall in West Singapore. Linked directly to Boon Lay MRT.'
  },
  {
    id: 'HDB-J81',
    carparkNo: 'J81',
    name: 'Block 208 - 216 Jurong East Street 21 (MSCP)',
    address: 'Blk 208A Jurong East St 21',
    postalCode: '601208',
    region: 'West',
    type: 'HDB',
    agency: 'HDB',
    lat: 1.3385,
    lng: 103.7412,
    gantryHeight: 2.15,
    carparkSystem: 'Multi-storey',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'SUN & PH ONLY',
    lotsAvailable: 198,
    totalLots: 450,
    vehicleLots: {
      C: { available: 198, total: 450 },
      Y: { available: 38, total: 70 }
    },
    evChargers: {
      count: 3,
      provider: 'CDG ENGIE',
      powerKw: '22kW AC',
      pricePerKwh: '$0.58 / kWh'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (07:00 - 22:30)',
      weekdayNight: '$0.60 per 30 mins (Max $5.00 cap)',
      weekendDay: 'Free on Sundays & PH (07:30 - 22:30)',
      weekendNight: '$0.60 per 30 mins (Max $5.00 cap)',
      perHourEstimate: 1.20,
      flatNightCap: '$5.00 max night cap',
      freeParkingRule: 'Free on Sundays & PH',
      gracePeriodMinutes: 10
    },
    history: [230, 215, 205, 198, 190, 198],
    lastUpdated: new Date().toISOString(),
    notes: 'Walking distance to Jurong East MRT and IMM.'
  },
  {
    id: 'MALL-CLEMENTI',
    carparkNo: 'CLM-01',
    name: 'The Clementi Mall',
    address: '3155 Commonwealth Avenue West',
    postalCode: '129588',
    region: 'West',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3152,
    lng: 103.7650,
    gantryHeight: 2.00,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 72,
    totalLots: 360,
    vehicleLots: {
      C: { available: 72, total: 360 },
      Y: { available: 15, total: 40 }
    },
    evChargers: {
      count: 3,
      provider: 'Charge+',
      powerKw: '22kW AC',
      pricePerKwh: '$0.60 / kWh'
    },
    rates: {
      weekdayDay: '$1.70 for 1st hr; $0.45 per next 15 mins (06:00 - 18:00)',
      weekdayNight: '$2.50 per entry (18:00 - 05:59)',
      weekendDay: '$2.00 for 1st hr; $0.50 per next 15 mins',
      weekendNight: '$2.70 per entry',
      perHourEstimate: 2.00,
      flatNightCap: '$2.50 flat after 6pm',
      gracePeriodMinutes: 10
    },
    history: [110, 95, 82, 72, 68, 72],
    lastUpdated: new Date().toISOString(),
    notes: 'Direct access to Clementi bus interchange and MRT.'
  },

  // NORTH REGION
  {
    id: 'HDB-WD12',
    carparkNo: 'WD12',
    name: 'Woodlands Civic Centre & Town Central (MSCP)',
    address: '900 South Woodlands Drive',
    postalCode: '730900',
    region: 'North',
    type: 'HDB',
    agency: 'HDB',
    lat: 1.4360,
    lng: 103.7865,
    gantryHeight: 2.15,
    carparkSystem: 'Multi-storey',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'SUN & PH ONLY',
    lotsAvailable: 245,
    totalLots: 620,
    vehicleLots: {
      C: { available: 245, total: 620 },
      Y: { available: 45, total: 90 },
      H: { available: 12, total: 20 }
    },
    evChargers: {
      count: 4,
      provider: 'SP Mobility',
      powerKw: '22kW AC',
      pricePerKwh: '$0.58 / kWh'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (07:00 - 22:30)',
      weekdayNight: '$0.60 per 30 mins (Max $5.00 night cap)',
      weekendDay: 'Free on Sundays & PH (07:30 - 22:30)',
      weekendNight: '$0.60 per 30 mins (Max $5.00 cap)',
      perHourEstimate: 1.20,
      flatNightCap: '$5.00 max night cap',
      freeParkingRule: 'Free on Sundays & PH',
      gracePeriodMinutes: 10
    },
    history: [310, 280, 260, 245, 230, 245],
    lastUpdated: new Date().toISOString(),
    notes: 'Right beside Woodlands Regional Library & CPF Building.'
  },
  {
    id: 'MALL-CAUSEWAY',
    carparkNo: 'CW-01',
    name: 'Causeway Point (Woodlands)',
    address: '1 Woodlands Square',
    postalCode: '738099',
    region: 'North',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.4361,
    lng: 103.7858,
    gantryHeight: 2.00,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 85,
    totalLots: 580,
    vehicleLots: {
      C: { available: 85, total: 580 },
      Y: { available: 22, total: 60 }
    },
    evChargers: {
      count: 4,
      provider: 'Shell Recharge',
      powerKw: '50kW DC / 22kW AC',
      pricePerKwh: '$0.66 / kWh'
    },
    rates: {
      weekdayDay: '$1.60 for 1st hr; $0.45 per next 15 mins (06:00 - 18:00)',
      weekdayNight: '$2.50 per entry (18:00 - 05:59)',
      weekendDay: '$2.00 for 1st hr; $0.50 per next 15 mins',
      weekendNight: '$2.70 per entry',
      perHourEstimate: 2.00,
      flatNightCap: '$2.50 flat after 6pm',
      gracePeriodMinutes: 10
    },
    history: [140, 115, 98, 85, 78, 85],
    lastUpdated: new Date().toISOString(),
    notes: 'High demand before Woodlands Checkpoint entry during evening peak.'
  },
  {
    id: 'MALL-NORTHPOINT',
    carparkNo: 'NP-01',
    name: 'Northpoint City (North & South Wings)',
    address: '930 Yishun Avenue 2',
    postalCode: '769098',
    region: 'North',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.4294,
    lng: 103.8360,
    gantryHeight: 2.10,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 310,
    totalLots: 1100,
    vehicleLots: {
      C: { available: 310, total: 1100 },
      Y: { available: 50, total: 130 }
    },
    evChargers: {
      count: 6,
      provider: 'CDG ENGIE',
      powerKw: '50kW DC / 22kW AC',
      pricePerKwh: '$0.64 / kWh'
    },
    rates: {
      weekdayDay: '$1.60 for 1st hr; $0.45 per next 15 mins (06:00 - 18:00)',
      weekdayNight: '$2.50 per entry (18:00 - 05:59)',
      weekendDay: '$2.00 for 1st hr; $0.50 per next 15 mins',
      weekendNight: '$2.70 per entry',
      perHourEstimate: 2.00,
      flatNightCap: '$2.50 flat after 6pm',
      gracePeriodMinutes: 10
    },
    history: [420, 370, 335, 310, 290, 310],
    lastUpdated: new Date().toISOString(),
    notes: 'Direct connection to Yishun MRT & Nee Soon Central Community Club.'
  },

  // NORTH-EAST REGION
  {
    id: 'MALL-NEX',
    carparkNo: 'NEX-01',
    name: 'NEX Serangoon Shopping Mall',
    address: '23 Serangoon Central',
    postalCode: '556083',
    region: 'North-East',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.3506,
    lng: 103.8727,
    gantryHeight: 2.05,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 122,
    totalLots: 880,
    vehicleLots: {
      C: { available: 122, total: 880 },
      Y: { available: 28, total: 80 }
    },
    evChargers: {
      count: 6,
      provider: 'SP Mobility',
      powerKw: '22kW AC',
      pricePerKwh: '$0.63 / kWh'
    },
    rates: {
      weekdayDay: '$1.80 for 1st hr; $0.50 per next 15 mins (07:00 - 18:00)',
      weekdayNight: '$2.60 per entry (18:00 - 06:59)',
      weekendDay: '$2.30 for 1st hr; $0.60 per next 15 mins',
      weekendNight: '$2.80 per entry',
      perHourEstimate: 2.20,
      flatNightCap: '$2.60 flat after 6pm',
      gracePeriodMinutes: 10
    },
    history: [190, 160, 138, 122, 110, 122],
    lastUpdated: new Date().toISOString(),
    notes: 'Busy junction at Upper Serangoon Rd & Boundary Rd. Multi-tier basements.'
  },
  {
    id: 'MALL-WATERWAY',
    carparkNo: 'WWP-01',
    name: 'Waterway Point Punggol (East & West Wings)',
    address: '83 Punggol Central',
    postalCode: '828761',
    region: 'North-East',
    type: 'Shopping Mall',
    agency: 'Private',
    lat: 1.4067,
    lng: 103.9022,
    gantryHeight: 2.10,
    carparkSystem: 'Basement',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 215,
    totalLots: 950,
    vehicleLots: {
      C: { available: 215, total: 950 },
      Y: { available: 42, total: 100 }
    },
    evChargers: {
      count: 8,
      provider: 'CDG ENGIE',
      powerKw: '50kW DC / 22kW AC',
      pricePerKwh: '$0.64 / kWh'
    },
    rates: {
      weekdayDay: '$1.60 for 1st hr; $0.45 per next 15 mins (06:00 - 18:00)',
      weekdayNight: '$2.40 per entry (18:00 - 05:59)',
      weekendDay: '$2.00 for 1st hr; $0.50 per next 15 mins',
      weekendNight: '$2.60 per entry',
      perHourEstimate: 2.00,
      flatNightCap: '$2.40 flat after 6pm',
      gracePeriodMinutes: 10
    },
    history: [290, 260, 235, 215, 200, 215],
    lastUpdated: new Date().toISOString(),
    notes: 'Located next to Punggol Waterway Park and Punggol MRT/LRT.'
  },
  {
    id: 'HDB-PL12',
    carparkNo: 'PL12',
    name: 'Block 308 - 314 Punggol Walk (MSCP)',
    address: 'Blk 308A Punggol Walk',
    postalCode: '821308',
    region: 'North-East',
    type: 'HDB',
    agency: 'HDB',
    lat: 1.4035,
    lng: 103.9050,
    gantryHeight: 2.15,
    carparkSystem: 'Multi-storey',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'SUN & PH ONLY',
    lotsAvailable: 285,
    totalLots: 580,
    vehicleLots: {
      C: { available: 285, total: 580 },
      Y: { available: 58, total: 90 }
    },
    evChargers: {
      count: 3,
      provider: 'Charge+',
      powerKw: '22kW AC',
      pricePerKwh: '$0.58 / kWh'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (07:00 - 22:30)',
      weekdayNight: '$0.60 per 30 mins (Max $5.00 night cap)',
      weekendDay: 'Free on Sundays & PH (07:30 - 22:30)',
      weekendNight: '$0.60 per 30 mins (Max $5.00 cap)',
      perHourEstimate: 1.20,
      flatNightCap: '$5.00 max cap',
      freeParkingRule: 'Free on Sundays & PH',
      gracePeriodMinutes: 10
    },
    history: [330, 310, 295, 285, 275, 285],
    lastUpdated: new Date().toISOString(),
    notes: 'Generous lot clearance and clean automated barrier gates.'
  },
  {
    id: 'URA-MAXWELL',
    carparkNo: 'MAX-URA',
    name: 'Maxwell Road & Tanjong Pagar (URA Surface)',
    address: 'Maxwell Road / Kadayanallur St',
    postalCode: '069184',
    region: 'Central',
    type: 'URA',
    agency: 'URA',
    lat: 1.2801,
    lng: 103.8447,
    gantryHeight: 4.50, // Open surface lot
    carparkSystem: 'Surface',
    systemType: 'Electronic Parking System (EPS)',
    nightParking: true,
    freeParking: 'NO',
    lotsAvailable: 34,
    totalLots: 120,
    vehicleLots: {
      C: { available: 34, total: 120 },
      Y: { available: 12, total: 25 },
      H: { available: 4, total: 8 }
    },
    rates: {
      weekdayDay: '$1.20 per 30 mins (07:00 - 17:00 Central Area)',
      weekdayNight: '$0.60 per 30 mins (17:00 - 22:30)',
      weekendDay: '$0.60 per 30 mins (07:00 - 22:30)',
      weekendNight: '$0.60 per 30 mins',
      perHourEstimate: 2.40,
      flatNightCap: '$5.00 night cap (22:30 - 07:00)',
      gracePeriodMinutes: 10
    },
    history: [60, 52, 44, 38, 34, 30, 34],
    lastUpdated: new Date().toISOString(),
    notes: 'Directly opposite Maxwell Food Centre and Maxwell MRT Station. Open surface clearance > 4.5m.'
  }
];
