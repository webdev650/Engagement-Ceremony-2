export interface ScheduleEvent {
  id: string;
  title: string;
  sanskritTitle?: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  iconName: string;
}

export interface FamilyMember {
  name: string;
  relation: string;
  blessing: string;
  avatarText: string;
}

export interface WeddingData {
  couple: {
    bride: string;
    groom: string;
    monogram: string;
    tagline: string;
  };
  eventDate: {
    fullDate: string;
    devanagariDate: string;
    isoDate: string;
    time: string;
  };
  venue: {
    name: string;
    address: string;
    city: string;
    mapUrl: string;
    googleMapsEmbedUrl?: string;
    valetNote: string;
    dressCode: string;
  };
  sanskritVerses: {
    blessingHeader: string;
    blessingTranslation: string;
    gratitudeFooter: string;
    gratitudeTranslation: string;
  };
  events: ScheduleEvent[];
  family: FamilyMember[];
}

export const weddingData: WeddingData = {
  couple: {
    bride: "Ananya Vance",
    groom: "Kabir Sterling",
    monogram: "A & K",
    tagline: "Together with their families, invite you to share in the joy of their eternal union.",
  },
  eventDate: {
    fullDate: "Saturday, October 24, 2026",
    devanagariDate: "शनिवार, २४ अक्टूबर २०२६",
    isoDate: "2026-10-24T17:00:00",
    time: "5:00 PM Onwards",
  },
  venue: {
    name: "Taj Lake Palace Heritage Grand Mandap",
    address: "Pichola, Udaipur, Rajasthan 313001",
    city: "Udaipur, India",
    mapUrl: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur",
    valetNote: "Complimentary boat transfer & VIP valet parking available at City Palace Jetty.",
    dressCode: "Royal Ethnic / Indian Formal Attire",
  },
  sanskritVerses: {
    blessingHeader: "ॐ श्री गणेशाय नमः",
    blessingTranslation: "Obstacles are removed, auspiciousness prevails, and divine love flourishes.",
    gratitudeFooter: "धन्यवादः — सर्वे भवन्तु सुखिनः",
    gratitudeTranslation: "Thank You — May all beings everywhere be happy and free.",
  },
  events: [
    {
      id: "ganesh-puja",
      title: "Shubh Aarambh & Ganesh Puja",
      sanskritTitle: "श्री गणेश पूजा",
      date: "Friday, Oct 23",
      time: "10:00 AM",
      venue: "Royal Courtyard",
      description: "Invoking Lord Ganesha's divine blessings to commence the wedding celebrations.",
      iconName: "Flame",
    },
    {
      id: "haldi-mehendi",
      title: "Haldi & Mehendi Utsav",
      sanskritTitle: "हल्दी एवं मेहंदी महोत्सव",
      date: "Friday, Oct 23",
      time: "3:30 PM",
      venue: "Lakeside Marigold Deck",
      description: "Turmeric blessings, vibrant henna artistry, folk melodies, and traditional brass tunes.",
      iconName: "Sun",
    },
    {
      id: "sangeet",
      title: "Royal Sangeet & Celebration",
      sanskritTitle: "संगीत संध्या",
      date: "Friday, Oct 23",
      time: "7:30 PM",
      venue: "Grand Ballroom",
      description: "An evening of royal musical performances, dance spectacles, and candlelit banquets.",
      iconName: "Music",
    },
    {
      id: "vivaah",
      title: "Pheras & Shubh Vivah",
      sanskritTitle: "शुभ विवाह (सप्तपदी)",
      date: "Saturday, Oct 24",
      time: "5:00 PM",
      venue: "Sacred Lake Mandap",
      description: "The sacred seven circumambulations around the holy fire under golden starlight.",
      iconName: "Heart",
    },
  ],
  family: [
    {
      name: "Mrs. Savitri & Mr. Rajesh Vance",
      relation: "Parents of the Bride",
      blessing: "With hearts full of love, we welcome you to bless our beloved daughter Ananya.",
      avatarText: "AV",
    },
    {
      name: "Mrs. Meenakshi & Mr. Vikram Sterling",
      relation: "Parents of the Groom",
      blessing: "We rejoice in Kabir finding his soulmate and invite your sacred presence.",
      avatarText: "KS",
    },
    {
      name: "Grandparents Vance & Sterling",
      relation: "Elders & Guardians",
      blessing: "May the almighty shower eternal health, harmony, and prosperity upon the couple.",
      avatarText: "VS",
    },
  ],
};
