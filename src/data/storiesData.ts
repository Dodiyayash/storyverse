export interface StoryItem {
  id: string;
  title: string;
  subtitle?: string;
  genre: string;
  readTime: string;
  readMinutes: number;
  chapterInfo?: string;
  excerpt: string;
  coverUrl: string;
  coverAlt: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
    verified?: boolean;
  };
  likes: number;
  views?: string;
  rating?: number;
  ratingsCount?: string;
  publishedDate?: string;
  isStaffPick?: boolean;
}

export interface WriterProfile {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
  storiesCount: number;
  followersCount: string;
  verified: boolean;
}

export interface GenreCategory {
  id: string;
  name: string;
  filterKey: string;
  countLabel: string;
  imageUrl: string;
  imageAlt: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  badge?: string;
  timeAgo: string;
  avatarUrl: string;
  content: string;
  highlightQuote?: string;
  likes: number;
  liked?: boolean;
  isEditorHighlight?: boolean;
  replies?: {
    id: string;
    authorName: string;
    timeAgo: string;
    avatarUrl: string;
    content: string;
    likes: number;
    liked?: boolean;
  }[];
}

export const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeoDmxG-uoO4UknCind_6VB2Qg_l1ujBdAJAzrgolARrn7C0XIgMoccqIwj-aLIU-wTiAf0mGhzR3ZKzUILYdBPCnJC6Uz7fxUPj4sXBoWD0hfktgeRCjB9Vsp5ajJKx9dKwaJ7fLvHgazrZqISWF-HMdrT3I7wDhWDka6rNjJm0GOm5gwulSq8FwF6hRt0rybbqO6SkAicXla7Am5ZGz2Du8_QdL5xKC8-5jEhxZtLzhFu0TaV42-",
  userProfile: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv5A21YfFf5fuD2Srg1Z78Na4qLGMydLDTnf005oDrKgWfT9B3Z6XhmN_vKf-OhdtNK-iqbuEuNmG0zjLaNMEqxXaw9QzVne79-I0UPky4AAKYl1HHZMZR9W6k67fWS8IvMXYIIt9vdIzBMdruMSB9Il_-GXuVVdat5eD4sXh4WWv2ajK-EotosgyYfUgw-MOk1v4mMm2YzilqttfM-iIOuSiElOJdciB2IFg2Aa6rmAq9J7ZvzsCs",
  heroManuscript: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDYAFF2PSA_4eH_3Vc6eWPA0OUAk6fP_7CUFTI1eDbXur23fzu379cBdusm2cjcSQRWGokfP_-CEtaveOuBOTE-2buSjo4IMw3BCPiYj_hdemuvqxEwJM2RkqxZgc3UguDurRi2QeBXSJg6vRQi6aK7yb9DHRmmBP-Tbab0iGkwektZG9AhvMqgApJKoVliTPYz_k7UX-mOJLicjP2HRtWqkv9Wq6PwgjrsoVOgk_x470UrlSWRXeI",
  readerAvatars: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDu-yKROG76l3h-HwAj9lIZZIxdbfPx7wQLozEnH4BDob5ePxQC1PmzRGx0DJMJCT3eej7fNlawGhYdip8ifT4-ZnaJFywskKj4MqjFKJ_9oSt78BkWB9Kfna2X4EKszBwspvoirXf2mVYFNeUMgIWzEjXcU9KA4hw3ngOe0A3FnpOPOubYWfN0H6DyAMT_fSQ_ui2jRYeP_uQelKii3f-ICYNJI_iUN30NsmR3Bn0yMgKT4NU1WjV2",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDwcWp1x8Ps6vWEHMAxfj9XlVdhuSC2pHa58h-N9Nx-ZveXQIp0ia-ULnUFviGVzBGDt9BcyqQGp4Q5durjtqPXNxbujQkuFJxCJHEKb3Gl7wqvAFsFSZxjCk8XsWMkgNEJ1QJvPKIP7NDuhnqrjlaRuU5lsUBQ7SlneiX0Iz8ZEYwYKyc2nly8_ocROrnSC7OY4wIzAzKXPGlNGbrEBq3fG2SEDqBEHvWZddtdhq41kCcYTAJc0V1T",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBDoXCRph93ls4d-Oqhnfe5ETk5jShg1vVcTWNj2mCWo3irC9r8CImNH9W8ZLwrr9QWWVmcrvtpELofnWUzwMvUvQUsFV8T5MCLpFi6x2W-MyhLnXHhQd8lTjxLs-JIR_PvovStrRU0KFvUCZBnRVn52EP_Q5BE9e7FqyDGA6QO6GmSQl8Rxi5WHJFa0DIQob1T5KqQwoXFsOdmjY3oPTWs8Gq_m92lkejfIQ4C3eaA_odLtm0KnL1F"
  ],
  editorsPickCover: "https://lh3.googleusercontent.com/aida-public/AB6AXuBySxImeaIs56dNCfxHinPYIjDXSRXRlG7C2F45JAiqtL6b5nAtvRJicXjmMqCzSPCPbVMKFCfLQiBcejsk1cJkjY34IezMM3I9G9e_0O0Ss-BUDPMmPXU2SSM56ojyG9hqAg4TBAmCB5FoC3SM4rFeXIpSDZVsTN9dww5CghdO-Miw6h9mLbq2iXA7QRyxTiT7_K1u99xnfhQDcsjB9aLPG1QkG4kt771lAklUGhCKEaZuXyNEcf4c",
  matteoRossiHomeAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA64P1xgfj0K5UtQpMy1y9V5CTi0Zn1A8LEHcO_bM_HGZptYmPaJH1iSw00MmwG13Gp8Xc0O2UA4geIao-1LWyqobM8SLUvmQKsqEk79lLRDb1FZMYL9zN-wOpCMuBQHLp3-NkCixzXy-v9Asbz5Lcnhpmo2NCaoQw4qmm5V1h76a1xl4_uMK8q2XzyfrqYn8ptvpP8lLQyx_MV3SNpKfJNoBbwGPTKXAq3rupaVRCRrHiOEFxi9rr_",
  readingChapterIllustration: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnAXcdhmjd3o56KinvAKS1PTVT3S7G5hXgemFqkguP585Wm2xbhzwDhai22Qwe6aCYcJKo3HS_CjGLT7ARG9GbNFuoI7-ByRxZ3GgeO1MMMDNZsQKpLV8HmFBieCa3roT1P7Lm9xPfipBwHGdyr7P_5CXjWiBDp-OE5YOtaIPgGCmYCSophvThvibcMW-zt5oLyLxacyTSTcthbkVeDEENcU89u78mvP8663TfwWg_W48TaIWQm-uT",
  aanyaMehtaAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0BtGBNlw6iwm7AIVW5zIllMGgj72Bo_R9Fv_F9gcRDbzftmtXyTlj5SjqU_RFASr8OZSdb-Cmv6t0YVEcqKqBl4NWSf2Rqim4e7D4ZS5Inl3uk5JlWA695014-J3gFRypHxR3gmFLGDR6Zl6Blrg-b3XFZDaESJ8MvcSdvCAo-WAHveGm6baJldESMHLgz26foZwcOe7oxHDzAA8Mb3rS6syArkRRVvaGlTLeOPosOTptM-xpd9Ow",
  aanyaMehtaSpotlight: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQP5TKnpSdHMYf3EVEZInjUBLSJjx5g0iZUwOGupw8x3PP9gbUNAb0b5ROcojDwI6gOllCs9tZgdX1R_1hC7zwTx9-OKLtGd9e_ynY5SNH188DJ65JC7tSz3Xv2wCehrQWkQTfwR4oVgcvPokUbPrNH-9uAuIcgZXqIh9JIoGCylT-uRQJz4XEcSYSSqYYZuPDvqxPHC-F7_8pyeojXG0kBTW4z8RUDNF4yhUTqT7dY-AuLuOWl9mv",
  editorCoverPreview: "https://lh3.googleusercontent.com/aida-public/AB6AXuATp8XtDoJk92hkR8aKYsfa3nBSXW-S5kSB878b1NdUzUJmPRdIaA0er1bt88d5wUa81wYD6-TsKzoXK-128S1YNltQY8Wzu7ZCT8EFUH8w3hISOuWebc0Wxmq2LSt3PMGZx2p1SKQDiI8a1tKbVttNFROAlhlLQP6OXfT3wiyWXqxvBfR5FFQiQMy0IwqFOm6HKQR7wLQJLBttDSo48lAOfxW2wW3UaZl-dHiy6uIeNTTwyx09vFJS",
  editorEmbeddedVignette: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeLktGVyK6P5KR8PFAQVCFPlg6N2TvZCsE-vxYZdmZKyW8ubCILg1uWs98WeVWvQxM8iMXecIk-3vb877Ykrr_N5_YUSPPwxtxQDycZmRwAU1IqfTTq6NGIQQ7igygeeKTK9M4-2NEWbBgoNTdSyYwd4lLnjmOK5AJ0U6kpqAf8o5Aem3nfr4chjmUzTziwG1wrgEpTBI3bMpP1MzRb5J7ukRKyEsJViPpb0ixYUX9jYahs2pIxQhM"
};

export const HOME_FEATURED_STORIES: StoryItem[] = [
  {
    id: "the-last-letter",
    title: "The Last Letter",
    subtitle: "Chapter 2: The Whispers in the Attic",
    genre: "Literary Fiction",
    readTime: "12 min",
    readMinutes: 12,
    excerpt: "Hidden beneath floorboards of an abandoned canal house in Amsterdam, an unsent correspondence reawakens seventy years of buried confessions.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATsh1m6tRaTFYFGbVDRWHKE598sfdoL0DZZDUHHFT8XjAFk_nE2GKi_8b7kcyqoIQ1mUQ4XhBmcM_QAgaO3_Aifcf1D60X-0oBsXCY2aLYxXxB8HePgFCqogZf1Rtiv2ztm_QFyPt__v5cyL2xdqBqrviC4jCHHOfuJcWWDmp8iEP1tlmJt6gduSut0B-MDMq5hSjKO-wbJP_CErCwGFV5BK7mOwHIoElvuri2tMIqWfN563IchbCJ",
    coverAlt: "Soft ethereal painting of a melancholic coastal cliff with a solitary Victorian lighthouse and crashing foggy teal ocean waves, warm sepia undertones",
    author: {
      name: "Julian Sterling",
      role: "Literary Prose & Essays",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO58Ni_8yzVtJcygD-hXqzsxCSNhsBN7BMl7Ph0jBjd90YdSQ_4Q2AdQb0YGXtjgZzD-ZF1Ca_7W6_7Qjt5vRW_-m7kAxNxJYWhjP3A0jDDYFNYV72JB_7DqFQESOSPY77LLiBmINbDze65B-o2A96_7ymacpi7fK9FMV5J2U2Trj37zPKlrVNTJZXfBWe0ngOrqrbxRsJKzHYdQZZJ3dhfPFBzEQIAFJc-7jZto2im5f5olkiE7GL",
      verified: true
    },
    likes: 842
  },
  {
    id: "where-the-stars-sleep",
    title: "Where the Stars Sleep",
    subtitle: "Chapter 1: The Celestial Cartographer",
    genre: "Fantasy",
    readTime: "8 min",
    readMinutes: 8,
    excerpt: "A celestial cartographer discovers that dormant constellations whisper warnings to those daring to venture beyond the mapped edge of the stratosphere.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTFO7JOsXCL3ZHL1KpV-m0rjdwAZqTtXC70k-ZdYnVDA-Si3WiN5eWdBpBsDOVnsAJkNeqMChbLRocHlomObtiGJxQtgtdJOTxm9GzlzyiDSRHBhiB4l_xijvo5e9gEZ-2jcJFpyqPsk0sBCuCS79s5ldRkVlyExR4xwzH0vaz8OS220kX74gnkRWvdQirjhxOzYQwlKMzDSDoGsRl1grCOKYvpbqjuxS0iHL3pGVOQG7l5zbR9WEZ",
    coverAlt: "Enchanted twilight celestial garden with glowing night-blooming flora, constellation maps floating in indigo night skies",
    author: {
      name: "Elena Vance",
      role: "Mythology & Sci-Fi",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZZTmzBCbB2tA1Pf38-nnHqtr6aAilnCJLVKDX_FJ_rkjBrkXXyQ0CT5zY1bN1URHSLjU8aoworg8xWA4Nnu8F37jlAGMVtWL-7rm-YlPlkefWWq6fNAKNTrm1G65K_nBEUGpR2hmh2iPxh0Y5JoOh395qzH_u-xE54CCp-keT52dmFOhaeyXJ1fgAIAT8-C3zGKoPExQ-Pet_L3QnULzWSlmTtuUrzt4a9lsJAxhqgM7BYO3_eNAN",
      verified: true
    },
    likes: 1200
  },
  {
    id: "a-thousand-monsoons",
    title: "A Thousand Monsoons",
    subtitle: "Chapter 4: Pressed Marigolds",
    genre: "Romance",
    readTime: "15 min",
    readMinutes: 15,
    excerpt: "Separated by oceans and familial decree, two botanists preserve their love through hand-drawn pressed flora mailed each rainy season.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUP-7erMFhz2yke5_YeiXZ2X8xMMt0TzWhRnltkTAlBCRXyW_jKc6VOFV-ylg-tvkKkWZDVdoKprdLKf1F9pn6hxs5lpdKhalJBluOPdG4xoNKg5rS7eW2YgGpsMBLr-rX6qbC0Cpz6_nL-qtuHHRig14EHbRs1y1g4Nux3jtFyzBopb8LyK7RsM0dVVWHhyMvHhk5CyEVIwy8C7U6-A5iLN9yONf_ftDmlWM1uu-M3OlTB3AG0rgG",
    coverAlt: "Romantic monsoon downpour over old courtyard terrace filled with terracotta pots and lush marigolds",
    author: {
      name: "Priya Nair",
      role: "Contemporary Romance",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB3bV7KlTPSeSpSTFNIwY378_iBYptb4kKYNAS-os2F90ea8uLK7JiUasfITNTZqT8JOTK9-31tgzwV9DOru5822Gra4gs9Uixl5C1NNRe9NpUBkXiC_ajfN1REdKYyfofFw8lkzqYX4KwzwGU5uR6RmNRZcQjjYruU0AZ9saAyNdTk2Fr0zgaue3UW1wZMAVemZsw_KCcCFuaydlQCGhiZyq8kNDZGyq5aLcncuMN8MSnhxNfm6L6",
      verified: true
    },
    likes: 954
  },
  {
    id: "the-silent-city",
    title: "The Silent City",
    subtitle: "Chapter 14: The Sonic Archivists",
    genre: "Sci-Fi",
    readTime: "19 min",
    readMinutes: 19,
    excerpt: "When language is outlawed to prevent interplanetary wars, an underground guild of sonic archivists secretly records the human voice.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNO-gAe93xuKykAHGSd-CcbLsMCXGPdhz7Pb0yXG_NcNnD-Qh54VT2HMN6eIX5zz7DHlOGE97IsaiM_398TpUBqW4KnQ8gyFtYNIqlGcJYCnCySoJohimG7kD3Hb4a0vS5wKPxLX2y_nXaihw9zX84m6Vs6PEyg8yNJYtm0zoppLMMFKZRR1th8q6D67OJtRBhoD0-XcGf9GFnaQVTS88TUZsConLy5FXnc9hQzAmDjbvWLK5fT7A3",
    coverAlt: "Futuristic serene desert metropolis bathed in dusk twilight with sleek organic architecture under vast planetary rings",
    author: {
      name: "Kaelen Voss",
      role: "Speculative Fiction",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVQgJxDlbuZiJWq1ZOchDz1blkH0sbDehmE-vRNf1ZdZ4py1WnSews0wZ6pa_q4GlUuUspbaH8Vcf2eNqzWq9X-3Lfyby5NOx0e66dG9ARXKHFmQvqGpJ-eLQumVdCqPJY7KoF-rdVNc3sgFXHUGSdPANskZHCFJFzlKj1Fl-tSJLAve_wFo3QR1H85GFFxsS7JwK3xo0NLonE6wW3YUAPUXC_LeZ3yHHdc1BmXU8iKSWZnAul1rnO",
      verified: true
    },
    likes: 2100
  }
];

export const HOME_TRENDING_STORIES: StoryItem[] = [
  {
    id: "before-the-coffee-gets-cold",
    title: "Before the Coffee Gets Cold",
    subtitle: "Chapter 3: The Fourth Seat by the Window",
    genre: "Magical Realism",
    readTime: "11 min",
    readMinutes: 11,
    views: "14.2k views",
    likes: 1800,
    excerpt: "In a quiet subterranean alley in Tokyo, a hundred-year-old cafe offers patrons the chance to return to a single hour of their past—so long as they finish before the porcelain cup cools.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhyQXByqr_OzBxVnv4lBBfyP6tXtjUR8GimQ1zSU7CvQBZdiQm03FqTZNaux984j4U1Vkurt2fzZPGknGECU4vwaVwoYCqCEuId2mpG0HjnBkIwD02iySpl-P3jlrCoRtIwfTsNmjR_ja3E3Mnmi5VGwnGw42XZkizcKxZBp_PQ2fFaLj_JsNfQ1vf2J3y4DnrynAl_qCAqaGQrc13ODMQ-Kbt8RrX94J9EXx8gPn8StoU6I8Of9XP",
    coverAlt: "Warm cozy Japanese cafe interior with steamed porcelain cup on wooden table next to antique wall clock",
    author: {
      name: "Maya Thorne",
      role: "Magical Realism Essayist",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrPLHx4QYSKfYSDgNNspnUnKhrT1Q99wts4m0Hb3BFaq8v1A_0xOdxUuHKV8LeHhJFwTHhnxTSR7rp0oGrOaId94QmjX_Qr3Tm5QCYvE16ZposASVT1ZuKNkdJltsDEacqnpHRbxWPX3OV66VWRjDQtQq3O-8dMtO6JtgVhmLmjJvtxUDFIInKdFVrnnxl8lPe6FYizRFNQtqpru9wiS4CYz4fImPlFSP_1drpPGtg7tbRqHPtyU47"
    }
  },
  {
    id: "letters-never-sent",
    title: "Letters Never Sent",
    subtitle: "Postscript: Autumn in Lyon",
    genre: "Epistolary",
    readTime: "9 min",
    readMinutes: 9,
    views: "9.8k views",
    likes: 1400,
    excerpt: "Twelve wax-sealed envelopes discovered inside a violin case trace a clandestine dialogue between a cellist and an archivist across pre-war Europe.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAciUrHd5II9KGXFgniSI_1skfrgmek6YI3L1KJVWY4pMNhxtSZ-KD9OsfdeE3E8_4Z47g1_GD4xmiDQaHM_f-rLSDk1C5kkOEjkp_PA2psSxtR37rNB5sjdzzKnk6ReCHESgr_2IsWgC_ynkUp3TIPWK62MPRHNFmLHhwEK-3rX1X0rxdpFPmp-OLcWaXhmRbP8fwlKy-eo0U2Uz9Kv_0V172oqT0DeG7O-PUOFA-ABniATcEcDcUQ",
    coverAlt: "Vintage desk littered with wax-sealed parchment envelopes, dried lavender, and antique calligraphy dip pen",
    author: {
      name: "Henri Laurent",
      role: "Epistolary Chronicler",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJWyqmHxHxlv73VuzOAauQrHqfpSajDntG1FZSlAY6IcjFjfSvTtkGsm9huXJAz5GYgHwK0NlwB-ynMoqWhnkbyE5v_iR3Ik6RtQ9o-cftIlarUP1MtlIbsELSvvoNrL3hfBquz7GalJ2miaFvcLyX2jk6cZiuVj-0l-xJXMxgSJIMXKf8sYOJ43dUiF6mOzRwW3RrOPhY3KIsBKjNQwPFNm-YEwKDderrqEJOIjNyqbKZqIhcMHcB"
    }
  },
  {
    id: "the-girl-from-platform-seven",
    title: "The Girl from Platform Seven",
    subtitle: "Chapter 5: The 11:42 Express",
    genre: "Suspense",
    readTime: "15 min",
    readMinutes: 15,
    views: "22.4k views",
    likes: 3600,
    excerpt: "She only appeared when the 11:42 express was delayed by snow. Conductor Graves knew better than to ask for her ticket; her ticket was always dated three years into the past.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-0hjMhHS8oT8s1GLTjNdeZrS6O10YCMpPqG0uHrzOUiMN7ectqkYV46bYlgmZo4f_Fc60k7pUEZ9oQLSNdwSbXaWdHI2WrQJAFjLc2b97stIfIZet0eUmW9Jb6P9mASVwJHVcShOn2TsVdA6J9qdyFjSd6WbosLwNK4Vyn0uNjQh_SKeI0E7GUOusGrJX0Y4ISdIW7Jhwy0zalDodVjn1fD1EYVUuVNTrJXpGAphXQ8g6ga92zkI9",
    coverAlt: "Moody foggy European train station with retro steam engines and arched glass ceiling",
    author: {
      name: "Clara Morales",
      role: "Psychological Suspense",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmYur8UsLdhoZ6agAecyCER4ShZlivIrJh8eB7zS54qLdWkpOtmhp6c3Rklw3u4RIRVa1wQweF8Lr8R88f_coPZRbsBm6fhUgMseqhZVJHZzc-5ZS-MyP9hFebCbiwQeYFv9Qr_M4Z9oEQLK02St5_AljfKw2QgRe3povTRPPgOJz5UFZme1duFIvL1iKVXsG1TG1VKlqjaD04fF9mNflAfcIEk5KlWjVCW9MDoJo9AuK75lHLdhyF"
    }
  },
  {
    id: "the-memory-collector",
    title: "The Memory Collector",
    subtitle: "Chapter 2: Amber Vials of October",
    genre: "Speculative",
    readTime: "14 min",
    readMinutes: 14,
    views: "17.5k views",
    likes: 2800,
    excerpt: "In an apothecary overlooking the harbor of Bergen, an aging glassblower distills forgotten childhood afternoons into luminous amber vials.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs0-xubfl6IUXI4L_5uKJJyJX6LBsQBjUiu1ZlZMG_sW7RH6wu27TtZs3_pr54eqOlu0CMfm74SdlVL7yw6pQOgB_d2W3CszU_1VEUyhb8uK_0O3sPGKBjAKMueFAA1rF0SbRnJZ7MqmnWcY4d-k0rm4qF2XNklVw6uJmnlqN8XbyJ5p6ACl3ofUZD6MICoV4Ceyr0WEH9C1a01kPTGMovJ9FNG8F1_0eR1Ao5f3QlKKdEi6UDQGIC",
    coverAlt: "Surreal antique apothecary shelf lined with glowing glass bottles each containing miniature memories",
    author: {
      name: "Jonas Lindqvist",
      role: "Speculative Chronicler",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBisOugLwPzn44kDHR6s7WeNIxYfEVXsP0dhMhD_eqvOpcOlTqMQK61zj6RPTWCrUFwZX3dLo9-RsEVGpYJjOBdp1yoNVaYg8LDdmtthta-OXaVpVCqulSM7-yNDLCxJnrN8uPd0zEe4czdWGrdy9N720WQolQDETlpNh1N6mGzzWO9UCzjkQ39ycv_xfHNdcYYtxU4Ccqf69iHdCsQgxOU5dsKMGfptR0FMj4BMhxxwDH1xAgu8sm0"
    }
  }
];

export const GENRE_CATEGORIES: GenreCategory[] = [
  {
    id: "romance",
    name: "Romance",
    filterKey: "Romance",
    countLabel: "3.2k stories",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuQCFqSHN0hWj-vKQUMMGsr0AjBgo9gJhj2QpVCdLSSaz7Gy5-eUWqh9tfZ1FtY3i8zyuI0DFs57UpHB8a-4bcqD_qN8IkH5xW52-REzw3F0h1bORZptzp6Dcv25xf22hHQcKwLXfadwHxE7omvrXOSinBt3imOy_xxfYkApP2jX2RK8i2L3yZD6aFIxCFg26UuYi2JyGmoA7Vpp5xglRwGzbna2Y4FeG5RTVYTZgrGlSRi2ni33gg",
    imageAlt: "Intimate sun-dappled meadow with wild peonies and romantic warm golden hour light"
  },
  {
    id: "mystery",
    name: "Mystery & Thriller",
    filterKey: "Mystery",
    countLabel: "2.8k stories",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7YK7JdqZm7IOd4uajLiA9Yk59V1USp9NyBzXgIYXsjHYR-sIVbrwTv21gTfGC-tXNULdAmuOvUS5h3IkWothS-LhmSjzh18hyiMjw9XComsUlWClKKRMHrrCxM5hn5I2c-jG63qChpLOkzp90EPXuqoZ314b6uLKGHCMdYpZ4KDAxvEEzg7oL8PNVI0FEpF1CtPUrraQ9Lyrrx33UsAB6f4J86lC_2Ulw62YaEf_Ys-UD7vvq1RJE",
    imageAlt: "Dark misty labyrinthine cobbled alleyway illuminated by a single warm gas lantern casting long shadows"
  },
  {
    id: "fantasy",
    name: "Fantasy",
    filterKey: "Fantasy",
    countLabel: "4.5k stories",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2LSKqevBz0_v90HGJihnbh4YRovpFveWfDz9WJjV0wOBId24vOjtU27VNxKelXVNh5uyNAn84_S8QEfM8l2OspRiPM77J8hpeYuoza1ca2ARjKhRT8iDKW_N33N0N4zfUcfou0Zt2urZfOmHqFNIiC7xZg9bX1jCwoVaxoGrhR7Rlp6T-NyR1--I5-Fo0Iw_S_fCY5XrgOOgV5eV7iNzo053MM-7dCi33XymOOjL8SLhSvLb7gwo6",
    imageAlt: "Mystical ancient stone castle spire towering amidst magical nebulae and shimmering aurora sky"
  },
  {
    id: "sci-fi",
    name: "Sci-Fi",
    filterKey: "Sci-Fi",
    countLabel: "1.9k stories",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfGkAmERO_Z_8L-JEiPPbdSUjLcP-x5P_Z9lcYpcYYeKTDQsHOXJMWB2_-43F8qnJRoRLBo_hOwhLRjYj3DUNYFVEMhPSzMxDp_tVGN8cWRTQEMNFn7xGxaOPjRMOwvQDBm0XQQcqePWFMUL2VvjLBsf02zL51EERMoV3ZHehnanvyYokOGsimMNVQ9OPDnGcZZalJPciZY4-oLrlexTQL9Bg31vfrjV4XOYCdnJ0GVy83stLkQgBE",
    imageAlt: "Ethereal orbital station observation deck overlooking a vibrant terracotta-colored alien ringed planet"
  },
  {
    id: "poetry",
    name: "Poetry",
    filterKey: "Poetry",
    countLabel: "1.2k stories",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMjCAYl3rnlga7U-JTcvvnssQIrVCAjOT5qmTL5Vef7p7pAQK68KPG_AP1BDL9ET2I78khR5BOz6JJNRwl3pQ_LK3xKbUML51NuxIgp78ge2raVS35UKlEj2ofqTjHykM8n9WodUEUdDzeNkc35mV21XOlCJpa3IUywo2Cbo1P2IzXAWfaz2TUXCUdQliWwmRZ_X3-Q-_mFZwJpbOO5Ez0n7Yk1lRC_NwW8Ug51StwdAK_w-i3uIbc",
    imageAlt: "Minimalist still life of vintage typewriter paper with inked verses, pressed dried wildflowers and soft shadows"
  },
  {
    id: "historical",
    name: "Historical",
    filterKey: "Drama",
    countLabel: "950 stories",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk0cd7q6cXFDVtI7rqKMnbfXwiGxVi4yC0UcBmB67lDuaHYVlFqzW6_6TxhFTCeJq2OJWGxF2gGniCpEo0bIUjIGmyO8PFelYlD-lktAhgwnZsREnSyrk01ni158QdYSdxRU4RSY9VhWpMXMreTSpgPkxqugjuDipNHcXDhF_HpDvTNhhvumQnAhGqMvEYOJBb3EkLoVP3hOT_iXde1WVcYTvzwTihkdV7qGeHPeF0cg3Mu10w6P3q",
    imageAlt: "Sunlit renaissance library hallway lined with tall arched windows, gilded manuscripts, and deep timber furnishings"
  }
];

export const FEATURED_WRITERS: WriterProfile[] = [
  {
    id: "elena-vance",
    name: "Elena Vance",
    specialty: "Mythology & Sci-Fi",
    bio: "Author of four speculative novellas. Exploring the thin membranes between cosmic astronomy, ancient folklore, and memory.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGMrk1-icE9tn_JFva86OXDJ7i9JgpngzFXOJDcsKjL69LZHLdp6zpf7RAhTP-hwkg5u_f5Opw1Zz43PfZK1g1srSNudnm2TM52mYFZzlUevtnG743N0ANfpCxGDTyFNUETfYWQTZmk3jlAwQZNsR8LSvDULCInHXR92XGg1Av4bgau0yRbEEWlE5_Ruv4GOigCKPelztQkZtZN_v9wa9XwXsEbSP7K1RmRT5AxZoIf9yYcGFAo56D",
    storiesCount: 24,
    followersCount: "18.4k",
    verified: true
  },
  {
    id: "julian-sterling",
    name: "Julian Sterling",
    specialty: "Literary Prose & Essays",
    bio: "Documenting stillness, coastal architecture, and quiet human relationships across modern European landscapes.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPRrfVm3bTyekChGDO1udmrZrrPWtE0hf5KsmlqL-2QuBlzrUawvESPPp9jYiNIjv5eIXZ5fKEh1v_L3-WN313maaFRzJIRFMoxrwn_E4gVVO7CnrOdNgKCZAP3XF0cDLjabOCCxJhnIMwLuFiozPCwyaBCOnQN421qhZsdGfVtLkQddXD2TFHO36m06iAEHVMaB4yx-Kv95YDM3jny-zAN1maoxwHyZ9RqKd3ih7oXPiiwWNGpg4j",
    storiesCount: 31,
    followersCount: "26.1k",
    verified: true
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    specialty: "Contemporary Romance",
    bio: "Crafting lyrical stories of deep romantic devotion, monsoon seasons, and intergenerational family heritage.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuBi_GQOXXZsg-fxWb8mo9vJv27qSX-IFTNCi3LVKKlBTtYEkHLCzIInvdyOeq5BukuUFtulcIfB7fqXmedDy8IJZvyOh7a-j0-kYRKkfXERvnv2XTwM6rA_sEfsNT7FrDXN1DlA5DxJlsFuKUh87X7Upv0i1qb4YDEjRqwp9s8y-GBjnX8a322827Zd1upPbxQukGFFAnFZ7lJVphuGZa-oEcQkVJ4R6KXUSMe8Sn-CtWNxzugCO5",
    storiesCount: 17,
    followersCount: "14.9k",
    verified: true
  },
  {
    id: "clara-morales",
    name: "Clara Morales",
    specialty: "Psychological Suspense",
    bio: "Former investigative journalist turning unsolved regional cold cases into heart-pounding serialized mysteries.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrdg-5cywKfg7TPxOBVEAgeLQ3YxJJsXXb1hFzaQlYIqOIH4DkSr9SWzlcJCuB5WpKiAt-x3Xf2RSBC9K5Icwx1EXjrLOLzXxlNoVLf2FoEiK_HoIi3NFe8JSGtBZ0tFlfRzPUrBdUVSFXoKas6NTfia8yG6Voxq8hq0dOPFynr3Hr4FTdZese1fv40VceHBbO7RAhVXEPxElkRe4V_zLj6TX6Cax4luV7R-ZOyL1QlxyWi05yG3f4",
    storiesCount: 19,
    followersCount: "21.8k",
    verified: true
  }
];

export const DISCOVER_STORIES: StoryItem[] = [
  {
    id: "discover-silent-city",
    title: "The Silent City",
    subtitle: "Chapter 14: The Harbor Bells",
    genre: "Mystery",
    readTime: "14 min read",
    readMinutes: 14,
    chapterInfo: "Serialized Ch. 14",
    excerpt: "Before the clock tower strikes four, the mist consumes the harbor completely. Julian noticed that the bells hadn't rung in twelve days, yet everyone in the district went on setting their mechanical pocket watches by the stillness.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVnYJd-6q2mQgA2pKhkCVhZiQR6XHPxGpssqFKEeZaoIR-8W3y2m2calvfY-TaNWv9_G6IlHcu8UBgUIg2bDBnxKZ-W_jrMo0xulKAhh9duC93eNhvM56XSkgs3hjwslPC29tqjoSMxj4J_asgKDBDkATJCJElyqVTk5joJq1W57z0dDuPCXN6z_MTwwh3RfzvGGhdQjC6JfBmdppieP7Fiiewx75h3QsVIBB4tkzjsV8pFMLy6cjo",
    coverAlt: "Moody cinematic photograph of a misty European classical metropolis shrouded in early morning fog",
    author: {
      name: "Elena Rostova",
      role: "Author of 8 novels",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuARPGvK1UZlyFk2TNmQ41ynYElPgymku9nmKtjdfzjgPwkGy0E_49TBUqxVTST-dvNJLbKKJ_EZj3PzTIHzJgjxbmkpnxLE-omtVtpL-O32kj4QMZtIavqyFsvZXHzN76rs0SjEmHgM7ES99rlBuSG-g1NHnRAznS7RNJcuGn2dXoEGxJaDe_uM7tVGYI5TG6QPtLztD0-IJQE6SCjVvfzFhYiJ5ZDs8nPZVbOErWzSd4NdUTNMiBX3",
      verified: true
    },
    likes: 1420,
    isStaffPick: true
  },
  {
    id: "discover-ocean-between-us",
    title: "The Ocean Between Us",
    subtitle: "Part III: Letters of Cedar and Brine",
    genre: "Romance",
    readTime: "18 min read",
    readMinutes: 18,
    chapterInfo: "Completed Novella",
    excerpt: "We wrote our promises on airmail stationery that carried the scent of cedar and Atlantic brine. By the third winter of our estrangement, the letters grew thinner, but each word seemed weighed down by the sea.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb9tDTz1puZH6Ga-TfHWU2HCQjDYbr_m0fDIGnr7WmPBO0Ow1liWdUd-F1S0IjCQNBK8Odr06VjS3rYtx1RQ7R5AWCWXnmGntmAo5Lv0i9zKpg7UVpoop2K0X3fY1TJ6CrYbVOD-mCdzGI_k_WktuX-nSF2fLPD1QjshZgLlrh1isFALJ8bKFAcVa5RIAgjBY-hsfN-TRv7yt_spTmh9ry2tt4aAjN_NYWz5MsCdHBcOeWfyBWBLIt",
    coverAlt: "Poetic photograph of rolling coastal waves in deep sepia and amber dusk light",
    author: {
      name: "Julian Sterling",
      role: "Fellowship Laureate",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj5OcXm82SPVxWhOZMiFAUw0AZyPDJdjYLxlI6SbQBGoZssWq1cCdTZri0F5JAMxT4cch4caG8eZCkNB8S7ysfNkgU9czQZfV5KxjyiWYoEp6TUgkCZIHI8JDpj9KZHlhjOpxcq9bKD0MCHRN1MCV2v4CFKPneOu_OhwelAamgLYEH8C0OgDcdEbN7yiMzujJEIV6Hg0SGVGPuuSVgq_CeTgXiGD6kQeXrksffmwhV6BQVKXvlLoNp",
      verified: true
    },
    likes: 3200,
    isStaffPick: true
  },
  {
    id: "discover-after-last-sunset",
    title: "After the Last Sunset",
    subtitle: "Log 48: Remnants of Atmospheric Flora",
    genre: "Sci-Fi",
    readTime: "22 min read",
    readMinutes: 22,
    chapterInfo: "Speculative Fiction",
    excerpt: "When the central reactor entered cryo-sleep, the station crew was left with fifty years of twilight. Dr. Kaelen began cataloging the remnants of atmospheric flora before nightfall became permanent.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB85Ew9N38dQls4Z5mST9-DffzRDrZNHK9AHNpnGlvI9pCsEaDCJ1TLF0oKg3Z_B63-E4RjysPSKlrC9pTJT1DyoqIQk8OwZuTKIF013Za8RWwMK2vPRagJ-JWJzMbs6bUumZLvks9xDG29ADwBYmC5ORZqmv_sY7WkL29bAluMZibK8gbZHXIq1jHagCKA3wXH8ao4qzJaFNKAHMQ9DFFQEc1J_bKGnlGnei8O_VLWcNKX29uk0GND",
    coverAlt: "Sci-fi evocative landscape of an arid desert planet under two pale moons and bronze ringed horizon",
    author: {
      name: "Dr. Mei Lin Zhao",
      role: "Hugo Nominee",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_ZRErL67E_j-XQBs49S1Fu-V8N-FoGIkkGZuu8YrTOJKN7Dwmt6Hoz-CkjWIJdQxnMnutpnO0ysCBLQtHGL1BsEaK2rX5RXRET865QrL35LCXHo-IYTQ8oX-mFkM75_spYSmBZyZR6aizmZJ3GjkBi4fF81a3Hn1Fjn0BGYsvXEdlYngApFGD4yvRJBSj8m_oU-IIs6_ZaNWcJa__C1bcE3w91GSB6ruU1j8Hv1wfiYoXNAEP3Q5b",
      verified: true
    },
    likes: 890
  },
  {
    id: "discover-house-beyond-woods",
    title: "The House Beyond the Woods",
    subtitle: "Chapter 2: Footsteps in the Fog",
    genre: "Thriller",
    readTime: "16 min read",
    readMinutes: 16,
    chapterInfo: "Short Story",
    excerpt: "There was never any smoke rising from the chimney, yet every midnight the distinct aroma of roasted hazelnut and burnt cedar drifted down into the parish square.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc1GJ4Ul5ylmHniNBm7PMbH1M0hLPEUIVVuGysOPzb0oge6MkEGmghxIqE7w3w0LHHM2E74qd6gWY-lYD61D769hVsEHoaEIDcQqDIFQYXnB27tTLztpGpcawJhmFFrZnISUMO9YwKMcnhOfJKixAJ_3X8O1qqUFzZEj7GZ0vmbYpWTBcbsWfsMg7OYEN5GwKaXm-ya4EhzeQtkffiDMA1_UbgabhkDdEGNqBDaAROel_PVYJf1RsU",
    coverAlt: "Gothic atmospheric manor house concealed by ancient twisted oak trees",
    author: {
      name: "Arthur Pendelton",
      role: "Bram Stoker Finalist",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDm_-qX9FOW9chXVjSflSNA5zReda6L32pui_8U2QBixqH6pDLxrGv1msiUnrjgDE1YZEOPKGYMn07d4QG6wpyuZ7CdXNKwUY-Wo0ZDLPrzTPfzzOHYSw59rnKkQcf0bU_mLwyYJnxnNxXEJFGEciP8IPHxgV0u089DPchA2q0qpiw198_fo4m0OEcTSzTUjWerxb8S77gpRQ-OjOmjyLfGUabrGxeYSDkv8pzt57f4-QF0mbavpsUJ",
      verified: true
    },
    likes: 2140,
    isStaffPick: true
  },
  {
    id: "discover-when-we-meet-again",
    title: "When We Meet Again",
    subtitle: "Essay: Autumn Rain on Rue Jacob",
    genre: "Drama",
    readTime: "11 min read",
    readMinutes: 11,
    chapterInfo: "Epistolary Essay",
    excerpt: "Seven years apart does something curious to memory: it softens the arguments into musical cadence and polishes the casual afternoon walks until they shine like museum relics.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3YApb6rvWol6mECUDRuVoRX-BNFSMm8Ju0qxR6k1XcfqnTQFXsvJyVXp5Xxxkzc1U7a8uoKAOoKhJAlk4hdQGkimVyP3ZqrmqtgCZ4IavAp-2topBMQZwPYLVL2OF2LD5Vr_2bgs8VdRu7EqiHDDa6tsO4ejBY9OeZjnj_QgxQ6A6fyNrrlDolAg-i_T0KohR5WeXChuLN3Rza86CfVA94xs9UspiVMImzSyt3K5eoq8NpVKesldp",
    coverAlt: "Intimate vintage Parisian cafe table with two porcelain espresso cups",
    author: {
      name: "Clara Vane",
      role: "Resident Columnist",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBWctfIqmR0el_l0KHMtEikKE4lKmzNHJLPinvgraUMp2YkbqgwdeOVF2SjFKLgyFLBNIr_FnlaBrinZQx1iBiqE7s5sajR3NAqk8yOsxCbzmEWQ2vZPdCUqSGkTi6SYzmZ1yLf7X638JYw88DkHoBSQ6HOEzIyalXrezWSR0glXEQvROg6tcS6zA9NibKKiEBJhxr8AumQbEkASh7-cwEOsEkHMc7qHHbCBbm_noCBS6I2b0W2qMp",
      verified: true
    },
    likes: 975
  },
  {
    id: "discover-thousand-monsoons",
    title: "A Thousand Monsoons",
    subtitle: "Canto I: Terracotta & Petrichor",
    genre: "Poetry",
    readTime: "7 min read",
    readMinutes: 7,
    chapterInfo: "Verse Collection",
    excerpt: "The petrichor arrives hours before the downpour itself. It carries the history of ten generations who planted their seed in terracotta mud and sang to the cloud-filled sky.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd9jgoEJelHLqY0O01xTKih6cXluP7EC6DgKWUl0iale4uXLzDAUOpC-WQAz0W4S8bBpx_HqYRAWPXtzqF7Wgfm7OqUpyEVGASWgQ-2jpRmIDZNuVJ9D87W1MA3B16yZFGZA1DybZKTvmVMVrw6GuWc5On-QEhqtFkH-IqE-lHi7tWpW9qhMfYSX8lU2iWK8ElhLUlqA94RtncVlN9fqmuAaGisQQJBjIOS9vd2-UGkfQnyVvnr94a",
    coverAlt: "Vivid artistic shot of emerald rice paddies under dramatic deep grey monsoon storm clouds",
    author: {
      name: "Aravind Menon",
      role: "Sahitya Akademi Grantee",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuByYUHOLW8w_DrLm-DcphFEXQt5-pmgTy0tRo-5KK9DCmEYlWGWxb42mXpCGxMcw2sb1ZB2yLr5b_WKmHcLu9PVQDwCRXGexagRQufi-ELkDtCuA1rNeskNxlj_ELe0UcwosfVI2xSt6zjUjmrH08pFvr_c-ZMeRydkUjLiKz4H_ytepn8Si_nbreo83XfdQcr36yf5-Cz9JEGq_AsymPFZDqjmfpvPK34XmBbTA1I2vVq3XXFPGvcw",
      verified: true
    },
    likes: 4120,
    isStaffPick: true
  },
  {
    id: "discover-where-stars-sleep",
    title: "Where the Stars Sleep",
    subtitle: "Book I: The Awakening",
    genre: "Fantasy",
    readTime: "28 min read",
    readMinutes: 28,
    chapterInfo: "Book I: The Awakening",
    excerpt: "They say the fallen stars did not burn out; they merely settled into the deep veins of the elder mountain, waiting for a cantor whose throat was untamed by courtly etiquette.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwrtvf-Kf13MzmTSeoiGggUhRQVFVXqgFNVf0_8h6MQddyjkbjR4LsOyRJMNs6JzU6QfyuBnQuFd_tw4vVc7l9KBYeg43NjOPEeXRux1iAR1z7OYiHe0FKYLWXDIQKhFSpx9GmFAZcPj6OAsjAwPldwY3oqLNx1cD6IN7AMBNxbs2wbwhYfuJsoGe5m9VJd1u-V21pbzYh3CV_tLykuXpP-HnyFNAFZRNMQwi0WW4SuiR-Zts1sU-V",
    coverAlt: "Ethereal fantasy illustration of a hidden crystal valley high in snowy alpine peaks",
    author: {
      name: "Selene Thorne",
      role: "World Fantasy Awardee",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpM_iTiuQ6tUAuGM1UcZ2mwvBdWWQR_MeV9BCiLQgWEpe9apSQ7RnZoEHLqD52xqjbLcji_zyxo5cn0mgCrA4RILmYlIRkJJVfWU2R5rxG1n28I8JL8PQfklmJDraLoPTz7x4Gao9HpCq4n6r6X7r-TUkPCMPdjtuB8Sce8iOreCj94n08XI4cWH1kveW1kQDqCRC1mMWq4uKnyXP8aFCIYEugJlbmoWrg-JzvUFqxXMI2WNRU4x0",
      verified: true
    },
    likes: 5600,
    isStaffPick: true
  },
  {
    id: "discover-last-letter",
    title: "The Last Letter",
    subtitle: "Chapter 2: The Whispers in the Attic",
    genre: "Romance",
    readTime: "9 min read",
    readMinutes: 9,
    chapterInfo: "Memoir Extract",
    excerpt: "Do not weep for the words we left unsaid; weep only for the stamps that remained in the drawer, unlicked and unable to carry our forgiveness across the channel.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC52277F8WaIxBVKNgX9j4lByk1-6oKF6aVMw50-q_vQf_5hj77Mm6iHjsLdaOyQ-JWGx75cTaGESp128X8FeYdLUJv9gN3HGBLM_yQ6ApcE6Qk_SLjbWLFqDDHMix8bm-_q2W_M7fG-u2XJNVH0VXaAiQ6zC8mBkbEAF76T5JaLnnHQcUaDro3yBVBVhkzx8NSEo8jZFocWvxrPsUsms4pOrORNLOFPpwTdlEKxkdMw1IVdG05yzyX",
    coverAlt: "Close up photograph of an antique ink fountain pen resting on handwritten cream parchment with dried rose petal",
    author: {
      name: "Matteo Rossi",
      role: "Essayist & Chronicler",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb8A0p50WGXupIay4SAv2Dx2s3j3y8iofvFJABjvjMZpU5qnnsP3v5pGHEo4IeMPvn8rndMqKxNttJUj6Mlfv9rCfu3dzmwy7BAtz-TDkyGEIZRC77oEC9VFAvH9j0Q09pWXWXMY9XwGfBzfV-ILG6kiBeoEQSy9DxJC_Ly124alpMrMXLvOtHIEcoWwjrpJmaV9h8V_3fxm1C0bpK6T2s2PSvAL2mPQBQCveuS-VIpx6El_gi-JXG",
      verified: true
    },
    likes: 1890
  },
  {
    id: "discover-girl-platform-seven",
    title: "The Girl from Platform Seven",
    subtitle: "Chapter 5: The 11:42 Express",
    genre: "Mystery",
    readTime: "15 min read",
    readMinutes: 15,
    chapterInfo: "Serial Detective Story",
    excerpt: "She only appeared when the 11:42 express was delayed by snow. Conductor Graves knew better than to ask for her ticket; her ticket was always dated three years into the past.",
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM9wI3vX595B0DxrkVGnYY1Wb1RN_DAamQJwIwa-3HV72ie0DBUZufwyw0kH72gZZhY2EZ_KeOd9WweOqKr_Ch3vLpi5uujsUCr477VHcBRY_G38RMebUPzo_piA9cDN--XZd0cTEnz67HkOlsF_eFqv2glDEhog-JsAtRprX8gbhDlC7VsSLmzS45oEMNc0HWsrGxJ89OCegRpDmMtoOAZvQ8h7INUeQ9GQ-ouJMDy0ftjeRWzTeu",
    coverAlt: "Atmospheric 1950s train station bathed in steam and amber spotlight",
    author: {
      name: "Freja Lindqvist",
      role: "Nordic Noir Guild",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_O2wzkPkFEEOUqtWCi18xbEQYXtilBrQ1zs19Nj3c0d8GTBpP5LYpTFS0yq5DeNOCpCKUhVct5fKQ86XgN5CQ0aqxe5nzDQ77OiVfZ30x9zMYymHDjdrfsjSJKwVoE93lN1RWEXJWodYRH3ufJHbV34tVGTGyLj88Y8X0K86vs_RR75t5sAo3Kakd9fXRHTZM5c4bzKhdHnJ_bvmxU6phtXGA0Ilhe4jnQLIr099EtfDBrZw96ilb",
      verified: true
    },
    likes: 3480,
    isStaffPick: true
  }
];

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: "c-1",
    authorName: "Dr. Julian Croft",
    badge: "Scholar",
    timeAgo: "2 hours ago · Somerset, UK",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQeuBw3FaKN1upl_d7XlyWTYFMZklOcdICVkjygQFvyuT3ttyOZzmiRbhvQNH3EQ3Nwl4Z8SoPGStcFdhtNuZIfu5pECSA9FcigU7RIrX5LJLhmkqL4Tvn_ch2AUTasmmsVhKSZu0OG37zEifrHlYVA52Oat8miBNEdqgvUsHNtsXa4fMr8wCFdRMlrSaSsFAUINyzyLyBkobTNYSvi9iSp42xu7E1YfUgUN7rDqs1Xz9MkspuctRI",
    content: "The deliberate mention that the \"coat had never seen the sea\" practically confirms Arthur orchestrated an escape toward the Continent via the coal barges. Mehta uses the Somerset terrain not merely as gothic window-dressing, but as an accomplice. Notice the pitch seal: diplomat courier protocol of the late twenties.",
    highlightQuote: "\"coat had never seen the sea\"",
    likes: 184,
    isEditorHighlight: true,
    replies: [
      {
        id: "r-1",
        authorName: "Margot Vance",
        timeAgo: "45 min ago",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtWB-XlwtBLovY7RvBbd1-Y3ZNbLUy5GRKmffP_noCJqztxsyFFpKsXxDTAylwAwBzcIV8VfBJXzFZAlgeVZw7I0hTpHMBTjDRVFKeT7wMlmC0-NXh31fg3881Q1Mk7zOSh7-CmpEgj2xtHmaaO46UpEm-iXcBOb-x1uXL4mL8qmmIm9b-EALye3xJKrYQNYQU4AI-gIrcrd5D3adDlNkwMeOTKS-1N7KGWp0SFfaNgmdJZh4IMlTO",
        content: "Precisely, Dr. Croft! And don’t overlook Eleanor’s dialogue: “Some ink was mixed to poison whoever read it next.” Metaphorical or literally arsenic-laced ink? Clara should inspect that manuscript with gloves!",
        likes: 42
      }
    ]
  },
  {
    id: "c-2",
    authorName: "Elias Thorne",
    timeAgo: "5 hours ago",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJhb0V_mwPBJr7iks-h5cNeXJb5bdBZy_9CdS36zc6dLhH7NuGobgHKbO1c0oh44wf7vLHn8lwwfOxJnnD3poXXdXUA-_x9je6RDyig4MSSQv4-hqFvmj-wEleiBGlgzOg716Lu4XdjRl2wLQUFaiKSjSGZl147X2RrlIXKpCYfOFjW-ITtWHtV2tEhYdrgxWv89ACtfLA5AuAztMGBoqjRg5AlBCc48NQ5ArSlNPMB0j7Q0_bOdnw",
    content: "That ending line sent actual shivers. The cadence of the prose when the candle extinguishes matches Clara’s breathing perfectly. StoryVerse’s layout really allows the prose to breathe without UI clutter. Brilliant work, Aanya!",
    likes: 76,
    isEditorHighlight: true
  }
];
