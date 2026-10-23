import { ShayariItem, MemoryItem, HiddenMessageItem } from '../types';

/**
 * =========================================================================
 * ROMANTIC CONTENT FOR SUSHMITA & VIVEK
 * =========================================================================
 * The 4 memories below are updated to feature the real moments and memories
 * of Sushmita & Vivek.
 * =========================================================================
 */

// Import memory photos matching Sushmita & Vivek's moments
import sushmitaStaircasePhoto from '../assets/images/memory_sushmita_staircase_1791017630317.jpg';
import parkPhoto from '../assets/images/memory_vivek_sushmita_park_1791017643789.jpg';
import flowerDuoPhoto from '../assets/images/memory_flower_smile_duo_1791017655724.jpg';
import morningClosePhoto from '../assets/images/memory_morning_close_portrait_1791017668292.jpg';

export const RECIPIENT_NAME = "Sushmita";
export const SENDER_NAME = "Vivek";

export const SHAYARI_LIST: ShayariItem[] = [
  {
    id: 1,
    title: "Tumhari Muskurahat",
    emoji: "❤️",
    theme: "The smile that brightens my day",
    lines: [
      "Tumhari muskurahat se din mera nikhar jaata hai,",
      "Tumhara naam aaye toh chehra khud muskuraata hai.",
      "Pata nahi kya rishta hai tumse, ae Sushmita,",
      "Bas tumhara khayaal bhi dil ko sukoon de jaata hai. ❤️"
    ],
    note: "Just thinking of you brings peace to my heart."
  },
  {
    id: 2,
    title: "Sirf Tum",
    emoji: "💌",
    theme: "Nothing more, only you",
    lines: [
      "Na chaand ki khwahish, na sitaaron ki farmaish hai,",
      "Mere dil ko toh bas tumhari ek muskurahat ki guzaarish hai.",
      "Duniya ki bheed mein bhi sukoon mil jaata hai,",
      "Jab tumhara ek chhota sa message aa jaata hai. 💌"
    ],
    note: "One little text from you turns my whole chaotic day soft."
  },
  {
    id: 3,
    title: "Tumhara Naam",
    emoji: "🌷",
    theme: "The meaning of love",
    lines: [
      "Har khoobsurat lafz mein tumhara ehsaas likhun,",
      "Apni har chhoti khushi ke paas tumhara naam likhun.",
      "Agar poochhe koi mujhse mohabbat ka matlab,",
      "Main muskura kar bas tumhara naam likhun. 🌷"
    ],
    note: "If anyone ever asks me what love means, I just whisper Sushmita."
  },
  {
    id: 4,
    title: "Ek Chhoti Si Dua",
    emoji: "🤍",
    theme: "A gentle prayer for your happiness",
    lines: [
      "Tumhari aankhon mein hamesha khushi ka noor rahe,",
      "Tumhare chehre par muskurahat zaroor rahe.",
      "Main har pal tumhare saath rahun ya na rahun,",
      "Meri dua hai tumhari duniya khushiyon se bharpoor rahe. 🤍"
    ],
    note: "My only wish is for your eyes to stay full of light and your heart full of laughter."
  },
  {
    id: 5,
    title: "Meri Favourite",
    emoji: "❤️🩹",
    theme: "You make everything feel special",
    lines: [
      "Tumse baat ho toh shaam haseen lagti hai,",
      "Tumhari hansi har baat se zyada pyaari lagti hai.",
      "Kya likhun tumhare liye, meri jaan,",
      "Tum paas ho toh har chhoti cheez khaas lagti hai. ❤️🩹"
    ],
    note: "Even the simplest tea or quiet silence feels magical with you."
  },
  {
    id: 6,
    title: "In English We Say…",
    emoji: "❤️",
    theme: "Beyond ordinary words",
    lines: [
      "In English, we say, ‘You make me happy,’",
      "But in shayari, I'd say…",
      "",
      "‘Teri hansi se roshan meri har shaam hai,",
      "Tujhse hi khoobsurat mere dil ka har paighaam hai.",
      "Lafzon mein kaise bataun tu kitni khaas hai,",
      "Meri har muskurahat ke peeche tera hi naam hai.’ ❤️"
    ],
    note: "English words are too short to describe what my heart feels for you."
  }
];

export const POLAROID_MEMORIES: MemoryItem[] = [
  {
    id: "mem-1",
    title: "Sushmita's Cute Pose",
    caption: "A moment worth keeping ♡",
    date: "Sunlit Staircase",
    location: "That gorgeous playful smile",
    imageUrl: sushmitaStaircasePhoto,
    rotationClass: "-rotate-2"
  },
  {
    id: "mem-2",
    title: "Our Day Together",
    caption: "My favourite memories.",
    date: "Under the Green Trees",
    location: "Lost in your eyes",
    imageUrl: parkPhoto,
    rotationClass: "rotate-2"
  },
  {
    id: "mem-3",
    title: "Flower In Our Hair",
    caption: "Some moments just feel different.",
    date: "Warm Smiles",
    location: "Two happy hearts",
    imageUrl: flowerDuoPhoto,
    rotationClass: "-rotate-1"
  },
  {
    id: "mem-4",
    title: "Resting Head Beside You",
    caption: "Ek tasveer, hazaar yaadein. ❤️",
    date: "9:44 AM Sunshine",
    location: "Forever safe with you",
    imageUrl: morningClosePhoto,
    rotationClass: "rotate-3"
  }
];

export const HIDDEN_MESSAGES: HiddenMessageItem[] = [
  {
    id: "miss-me",
    envelopeTitle: "Open when you miss me ♡",
    icon: "HeartHandshake",
    stampEmoji: "💌",
    greeting: "Dear Sushmita,",
    body: [
      "Whenever the day feels heavy or the distance feels a little too far, just take a deep breath and remember this:",
      "You are never alone. In every quiet pause of my day, in every good song I hear, and in every prayer I make, you are always right here with me.",
      "Close your eyes for ten seconds. Feel how much you are cherished, respected, and adored. I am always just a thought away, smiling at the thought of you."
    ],
    signoff: "Forever your biggest cheerleader & partner, Vivek ♡"
  },
  {
    id: "need-smile",
    envelopeTitle: "Open when you need a smile 🌷",
    icon: "Sparkles",
    stampEmoji: "🌷",
    greeting: "Sweet Sushmita,",
    body: [
      "Here is your official reminder that your laughter is genuinely the most beautiful sound in the universe.",
      "Whatever stressed you out today will pass. Don't carry the weight of everything all at once. You have survived every tough day so far, and you handle things with so much grace.",
      "Now soften your shoulders, unclench your jaw, and let that lovely smile appear. You look breathtaking when you smile, and nobody deserves joy more than you."
    ],
    signoff: "Sending you the warmest hug, Vivek ♡"
  },
  {
    id: "feel-special",
    envelopeTitle: "Open when you want to feel special 💗",
    icon: "Crown",
    stampEmoji: "👑",
    greeting: "My Wonderful Sushmita,",
    body: [
      "If you ever forget just how extraordinary you are, let me remind you:",
      "You have a kind, compassionate heart that makes the people around you feel safe. You have thoughts that inspire me, eyes that speak poetry, and an aura that brings calm wherever you walk.",
      "You don't need to do anything grand to be special — just being yourself is already a blessing to my life. I am so proud of who you are and everything you are becoming."
    ],
    signoff: "With all my love and reverence, Vivek ♡"
  }
];

export const FINAL_SURPRISE = {
  header: "Sushmita, ek aakhri baat… ❤️",
  shayari: [
    "Hazaaron khoobsurat cheezon ke beech,",
    "Tum meri woh pasand ho jise main har roz phir se chunna chahunga.",
    "Har din perfect ho, zaroori nahi,",
    "Bas har din mein thodi si tumhari muskurahat ho. ♡"
  ],
  personalNote: "I'm grateful to have you in my life, Sushmita. You make my ordinary moments feel special, and I'm happy that our story is ours to write. ❤️",
  signature: "Made with love, just for you — Vivek ♡"
};
