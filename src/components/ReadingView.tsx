import React, { useEffect, useState } from "react";
import {
  ASSETS,
  CommentItem,
  INITIAL_COMMENTS,
  StoryItem,
} from "../data/storiesData";

interface ReadingViewProps {
  activeStory?: StoryItem | null;
  bookmarkedTitles: string[];
  onToggleBookmark: (title: string) => void;
  followedWriters: Record<string, boolean>;
  onToggleFollowWriter: (name: string) => void;
  onShowToast: (title: string, message?: string) => void;
}

interface ChapterData {
  number: number;
  code: string;
  shortTitle: string;
  fullTitle: string;
  readTime: string;
  unlocked: boolean;
  completed?: boolean;
}

const CHAPTERS_INDEX: ChapterData[] = [
  {
    number: 1,
    code: "CH 1",
    shortTitle: "The Discovery",
    fullTitle: "Chapter 1: The Discovery",
    readTime: "15 min read",
    unlocked: true,
    completed: true,
  },
  {
    number: 2,
    code: "CH 2",
    shortTitle: "The Whispers",
    fullTitle: "Chapter 2: The Whispers in the Attic",
    readTime: "12 min read",
    unlocked: true,
    completed: false,
  },
  {
    number: 3,
    code: "CH 3",
    shortTitle: "Secret Unfolded",
    fullTitle: "Chapter 3: The Secret Unfolded",
    readTime: "14 min read",
    unlocked: true,
    completed: false,
  },
  {
    number: 4,
    code: "CH 4",
    shortTitle: "The Black Pitch",
    fullTitle: "Chapter 4: The Black Pitch",
    readTime: "16 min read",
    unlocked: true,
    completed: false,
  },
];

export const ReadingView: React.FC<ReadingViewProps> = ({
  activeStory,
  bookmarkedTitles,
  onToggleBookmark,
  followedWriters,
  onToggleFollowWriter,
  onShowToast,
}) => {
  const [scrollProgress, setScrollProgress] = useState(28);
  const [currentChapter, setCurrentChapter] = useState(2);
  const [fontSizeIndex, setFontSizeIndex] = useState(0); // 0: body-editorial-lg, 1: headline-sm, 2: headline-md
  const [isSerif, setIsSerif] = useState(true);
  const [readingTheme, setReadingTheme] = useState<"parchment" | "sepia" | "night">("parchment");
  const [focusMode, setFocusMode] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Applauds & Saves
  const [applaudCount, setApplaudCount] = useState(3428);
  const [hasApplauded, setHasApplauded] = useState(false);
  const [chapterSaved, setChapterSaved] = useState(false);

  // Comments & Forum
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [commentSort, setCommentSort] = useState<"top" | "newest" | "editor">("top");
  const [newCommentText, setNewCommentText] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const displayTitle = activeStory?.title || "The Last Letter";
  const isDefaultStory = !activeStory || activeStory.title === "The Last Letter";
  const activeChapterObj =
    CHAPTERS_INDEX.find((c) => c.number === currentChapter) || CHAPTERS_INDEX[1];
  const displaySubtitle = isDefaultStory
    ? activeChapterObj.fullTitle
    : activeStory?.subtitle || activeChapterObj.fullTitle;
  const displayAuthorName = isDefaultStory ? "Aanya Mehta" : activeStory.author.name;
  const displayAuthorRole = isDefaultStory
    ? "Novelist & Archival Historian · Fellow of the Royal Quill"
    : activeStory.author.role;
  const displayAuthorAvatar = isDefaultStory
    ? ASSETS.aanyaMehtaAvatar
    : activeStory.author.avatarUrl;
  const displayCover = isDefaultStory
    ? ASSETS.readingChapterIllustration
    : activeStory.coverUrl;

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(5, Math.round((scrollPos / docHeight) * 100)));
        setScrollProgress(pct);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sizeClasses = ["text-body-editorial-lg", "text-headline-sm", "text-headline-md"];

  const getThemeCanvasClasses = () => {
    if (readingTheme === "sepia") {
      return "bg-[#f4ecd8] text-[#463624] p-6 sm:p-10 rounded-2xl shadow-inner";
    }
    if (readingTheme === "night") {
      return "bg-[#201d1b] text-[#ddd9d7] p-6 sm:p-10 rounded-2xl shadow-xl";
    }
    return "text-on-surface";
  };

  const handleToggleApplaud = () => {
    if (!hasApplauded) {
      setHasApplauded(true);
      setApplaudCount((c) => c + 1);
    } else {
      setHasApplauded(false);
      setApplaudCount((c) => c - 1);
    }
  };

  const handlePublishComment = () => {
    if (!newCommentText.trim()) return;
    const created: CommentItem = {
      id: `c-${Date.now()}`,
      authorName: "Yash (Editor)",
      badge: isSpoiler ? "Spoiler Note" : "Editorial Fellow",
      timeAgo: "Just now",
      avatarUrl: ASSETS.userProfile,
      content: newCommentText.trim(),
      likes: 1,
      liked: true,
      isEditorHighlight: true,
    };
    setComments([created, ...comments]);
    setNewCommentText("");
    setIsSpoiler(false);
    onShowToast("Reflection Published", "Your marginalia was added to the Literary Dialogue.");
  };

  const handlePublishReply = (parentId: string) => {
    if (!replyText.trim()) return;
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== parentId) return c;
        return {
          ...c,
          replies: [
            ...(c.replies || []),
            {
              id: `r-${Date.now()}`,
              authorName: "Yash (Editor)",
              timeAgo: "Just now",
              avatarUrl: ASSETS.userProfile,
              content: replyText.trim(),
              likes: 1,
              liked: true,
            },
          ],
        };
      })
    );
    setReplyText("");
    setReplyingToId(null);
  };

  const handleToggleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        const liked = !c.liked;
        return {
          ...c,
          liked,
          likes: liked ? c.likes + 1 : c.likes - 1,
        };
      })
    );
  };

  const displayedComments = [...comments].sort((a, b) => {
    if (commentSort === "top") return b.likes - a.likes;
    if (commentSort === "newest") return a.id > b.id ? -1 : 1;
    return (b.isEditorHighlight ? 1 : 0) - (a.isEditorHighlight ? 1 : 0);
  });

  const isBookmarked = bookmarkedTitles.includes(displayTitle);
  const isAuthorFollowed = !!followedWriters[displayAuthorName];

  return (
    <div className="flex flex-col w-full relative">
      {/* Top Archival Reading Progress Strip (Locked immediately below app shell) */}
      <div className="sticky top-20 z-40 w-full bg-surface-container-low/95 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
          <div className="flex items-center gap-3 truncate">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Reading
            </span>
            <span className="truncate font-body-ui-sm text-body-ui-sm text-on-surface font-medium">
              {displayTitle}
            </span>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <span className="hidden sm:inline text-on-surface-variant truncate">
              {displaySubtitle}
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="font-label-md text-label-md font-semibold text-primary">
              Chapter {currentChapter} of 8 — <span>{scrollProgress}%</span>
            </span>
            <div className="w-24 sm:w-36 h-1.5 bg-surface-variant rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Narration Bar when active */}
      {isAudioPlaying && (
        <div className="max-w-[760px] mx-auto w-full px-4 pt-6">
          <div className="bg-secondary-fixed text-on-secondary-fixed px-space-lg py-space-sm rounded-xl shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary animate-pulse">
                graphic_eq
              </span>
              <div>
                <p className="font-label-md text-label-md font-bold">
                  Archival Audio Edition · Narrated by Julian Vance
                </p>
                <p className="font-label-sm text-label-sm opacity-80">
                  Playing {displaySubtitle} (03:14 / 12:00)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAudioPlaying(false)}
              className="px-3 py-1 rounded-lg bg-surface/80 text-on-surface font-label-sm text-label-sm font-semibold cursor-pointer"
            >
              Pause Audio
            </button>
          </div>
        </div>
      )}

      {/* Primary Reading Landscape */}
      <div className="w-full relative px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        {/* Centered Editorial Composition Frame */}
        <div className="max-w-[760px] mx-auto flex flex-col">
          {/* Story Metadata Header & Author Dossier */}
          {!focusMode && (
            <section className="flex flex-col gap-6 mb-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm tracking-wider uppercase font-bold shadow-sm">
                  {activeStory?.genre || "Literary Mystery"}
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-tertiary">
                    history_edu
                  </span>
                  Curated Serial
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    verified
                  </span>
                  StoryVerse Editor Pick
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-display-lg text-display-lg-mobile sm:text-display-lg text-on-surface tracking-tight leading-tight font-bold">
                  {displayTitle}
                </h1>
                <p className="font-headline-md text-headline-md text-primary italic font-serif opacity-90">
                  {displaySubtitle}
                </p>
              </div>

              {/* Author Byline Bar & Metadata */}
              <div className="p-4 sm:p-5 rounded-xl bg-surface-container-low shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      alt={displayAuthorName}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
                      src={displayAuthorAvatar}
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-surface"></span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {displayAuthorName}
                      </span>
                      <button
                        onClick={() => onToggleFollowWriter(displayAuthorName)}
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer ${
                          isAuthorFollowed
                            ? "bg-primary text-on-primary"
                            : "bg-primary/10 hover:bg-primary/20 text-primary"
                        }`}
                        type="button"
                      >
                        {isAuthorFollowed ? "Following" : "+ Follow"}
                      </button>
                    </div>
                    <span className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                      {displayAuthorRole}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 font-body-ui-sm text-body-ui-sm text-on-surface-variant pt-2 sm:pt-0">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-outline">
                      calendar_today
                    </span>
                    <span>Oct 14, 2025</span>
                    <span>•</span>
                    <span className="material-symbols-outlined text-base text-outline">
                      schedule
                    </span>
                    <span>{activeChapterObj.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-secondary">
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-label-md text-label-md font-bold text-on-surface">
                      4.8
                    </span>
                    <span className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                      (1,420 ratings)
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Chapter Illustration Canvas */}
          <section className="relative mb-14 rounded-2xl overflow-hidden shadow-md group">
            <div className="relative w-full aspect-[16/9]">
              <img
                alt="Misty dim-lit Victorian attic studio lined with leather-bound manuscripts"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                src={displayCover}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-on-primary font-label-sm text-label-sm">
                <span className="italic font-body-editorial-md text-body-editorial-md text-surface-bright/90">
                  Fig {currentChapter}.1 — The Mahon House garret, untouched since the autumn of
                  1924.
                </span>
                <span className="opacity-75 hidden sm:inline">Archival Plate XII</span>
              </div>
            </div>
          </section>

          {/* Atmospheric Distraction-Free Manuscript Sheet */}
          <article
            className={`prose max-w-none ${
              isSerif ? "font-body-editorial-lg" : "font-body-ui-md"
            } ${sizeClasses[fontSizeIndex]} ${getThemeCanvasClasses()} leading-[1.85] transition-all duration-300`}
            id="reading-canvas"
          >
            {!isDefaultStory && activeStory?.excerpt && (
              <p className="mb-8 italic opacity-90 border-l-2 border-secondary pl-4">
                {activeStory.excerpt}
              </p>
            )}

            {/* Opening Paragraph with Terracotta Drop Cap */}
            <p className="mb-8">
              <span className="float-left text-6xl leading-[0.78] font-headline-lg font-bold text-secondary mr-3 mt-1 font-serif select-none">
                T
              </span>
              he key turned with a dry, metallic shudder that rattled straight through the ivory
              bones of my fingers. Dust, ancient and undisturbed for half a century, fell in a faint
              grey veil across the brass escutcheon, smelling faintly of dried clover, dried ink,
              and long-abandoned grief. Beyond that threshold lay what the family had
              euphemistically referred to as the “lumber room”—though anyone who had spent more than
              an hour inside the Mahon House knew it was the cemetery of Arthur’s unpublishable
              verses.
            </p>

            <p className="mb-8">
              Outside, rain beat against the octagonal windowpanes with erratic ferocity, blurring
              the desolate expanse of the Somerset moors into an oceanic smudge of violet and slate.
              I took three steps onto the hemlock floorboards. They groaned beneath my boots like
              old men startled from half-sleep. Every inch of wall was claimed by bookshelves bowed
              under the quiet weight of folio editions, forgotten pamphlets on spiritualism, and
              bound ledgers stamped in tarnished gilt.
            </p>

            {/* Poetic Dialogue Accentuated */}
            <div className="my-10 p-6 sm:p-8 rounded-xl bg-surface-container shadow-sm">
              <p className="font-headline-sm text-headline-sm text-primary italic mb-3">
                “If you must search up there, Clara, remember that what is hidden was never meant to
                be reconciled. Some ink was mixed to poison whoever read it next.”
              </p>
              <span className="font-label-md text-label-md tracking-wider uppercase text-on-surface-variant font-semibold block">
                — Miss Eleanor’s warning at tea, earlier that twilight
              </span>
            </div>

            <p className="mb-8">
              The warning had sounded dramatic over porcelain cups and raspberry conserve. Up here,
              alone with the drafts whistling through the rafters, it carried the chilling resonance
              of an epitaph.
            </p>

            <p className="mb-8">
              On the central table rested Arthur’s bureau: a walnut beast with clawed feet and
              pigeonholes stuffed with crumbling correspondence. Yet it was not the desk that
              commanded the room’s uncanny stillness. It was the cedar chest tucked beneath the
              lowest eaves, bound in verdigris-crusted brass straps, humming with the faint draft
              that slipped between the cedar slats.
            </p>

            {/* Decorative Archival Fleuron Divider */}
            <div className="my-14 flex items-center justify-center gap-4 text-secondary/60">
              <span className="w-16 h-px bg-outline-variant"></span>
              <span className="material-symbols-outlined text-2xl text-secondary select-none">
                local_florist
              </span>
              <span className="w-16 h-px bg-outline-variant"></span>
            </div>

            {/* Section II of Prose */}
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 font-serif tracking-tight">
              The Second Fold of Paper
            </h2>

            <p className="mb-8">
              The lock on the cedar chest yielded without argument; it had already been forced years
              ago, its inner tumbler bent outward like a broken tooth. Inside lay no silver, no
              family jewels, nor the diary everyone presumed he had kept during his final,
              cloistered winter.
            </p>

            <p className="mb-8">
              There was only a single, folded sheet of deckle-edged rag paper, sealed not with the
              scarlet wax of the Mahon seal, but with black pitch—the unmistakable mark of a
              communication sent across borders in wartime, or across grief in solitude.
            </p>

            {/* Blockquote Inset with Subtle Amber Glow */}
            <div className="my-10 pl-6 sm:pl-8 py-2 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary rounded-full"></div>
              <p className="font-body-editorial-lg text-body-editorial-lg italic text-on-surface font-serif leading-relaxed mb-3">
                “To you who possess the courage to enter where sorrow sat: Arthur never drowned off
                the pier at Hastings. When the water subsided, only his coat returned, and the coat
                had never seen the sea.”
              </p>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold">
                Fragment found pinned to parchment margin
              </span>
            </div>

            <p className="mb-8">
              A draft swept the attic suddenly, extinguishing the tallow candle on the washstand.
              For four heartbeats, I stood in absolute, velvety dark. And then, from the far chimney
              nook where the shadows pooled deepest, came the sound: soft, deliberate, and
              undeniably human.
            </p>

            <p className="mb-10">The sound of a fountain pen scratching across dry vellum.</p>

            {/* Chapter End Marker Fleuron */}
            <div className="my-12 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-3 text-secondary">
                <span className="w-12 h-px bg-outline-variant"></span>
                <span className="font-serif italic font-headline-sm text-headline-sm">
                  Finis Capitis {currentChapter === 1 ? "I" : currentChapter === 2 ? "II" : currentChapter === 3 ? "III" : "IV"}
                </span>
                <span className="w-12 h-px bg-outline-variant"></span>
              </div>
              <span className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
                October 1924 Archive
              </span>
            </div>
          </article>

          {/* Reading Interaction Ribbon */}
          <section className="p-6 rounded-2xl bg-surface-container shadow-sm mb-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleToggleApplaud}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-label-md text-label-md transition-all duration-200 shadow-sm group cursor-pointer ${
                  hasApplauded
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface hover:bg-secondary-container hover:text-on-secondary-container text-on-surface"
                }`}
                type="button"
              >
                <span
                  className="material-symbols-outlined text-lg text-secondary group-hover:scale-125 transition-transform"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
                <span className="font-bold">{applaudCount.toLocaleString()}</span>
                <span className="text-on-surface-variant font-normal hidden sm:inline">
                  Applauds
                </span>
              </button>

              <button
                onClick={() => {
                  setChapterSaved(!chapterSaved);
                  onShowToast(
                    chapterSaved ? "Chapter Removed" : "Chapter Saved",
                    `${displaySubtitle} updated in your reading archive.`
                  );
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-label-md text-label-md transition-colors shadow-sm cursor-pointer ${
                  chapterSaved
                    ? "bg-primary text-on-primary"
                    : "bg-surface hover:bg-surface-container-high text-on-surface"
                }`}
                type="button"
              >
                <span
                  className={`material-symbols-outlined text-lg ${
                    chapterSaved ? "text-on-primary" : "text-primary"
                  }`}
                >
                  {chapterSaved ? "bookmark_added" : "bookmark_add"}
                </span>
                <span className="hidden sm:inline">
                  {chapterSaved ? "Saved Chapter" : "Save Chapter"}
                </span>
              </button>

              <button
                onClick={() => onToggleBookmark(displayTitle)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-label-md text-label-md transition-colors shadow-sm cursor-pointer ${
                  isBookmarked
                    ? "bg-surface-container-highest text-primary font-semibold"
                    : "bg-surface hover:bg-surface-container-high text-on-surface"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-lg text-tertiary">
                  {isBookmarked ? "playlist_add_check" : "playlist_add"}
                </span>
                <span className="hidden sm:inline">
                  {isBookmarked ? "In Reading List" : "Add to Reading List"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onShowToast(
                    "Archival Link Copied",
                    `Permalink to "${displayTitle}" copied to clipboard.`
                  )
                }
                className="p-2.5 rounded-xl bg-surface hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors shadow-sm cursor-pointer"
                title="Share via Link"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
              <button
                onClick={() =>
                  onShowToast(
                    "Editorial Note Logged",
                    "Thank you for helping preserve typographical fidelity."
                  )
                }
                className="p-2.5 rounded-xl bg-surface hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors shadow-sm cursor-pointer"
                title="Report Issue"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">flag</span>
              </button>
            </div>
          </section>

          {/* Chapter Switcher & Quick Navigation Deck */}
          <section className="mb-14 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Previous Chapter */}
              <button
                type="button"
                onClick={() => {
                  const prev = currentChapter > 1 ? currentChapter - 1 : 1;
                  setCurrentChapter(prev);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm text-left cursor-pointer"
              >
                <div className="flex items-center gap-2 text-outline group-hover:text-primary transition-colors font-label-sm text-label-sm uppercase font-semibold">
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Previous Chapter</span>
                </div>
                <div className="mt-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors block font-semibold">
                    The Discovery
                  </span>
                  <span className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                    Chapter 1 · 15 min read
                  </span>
                </div>
              </button>

              {/* Next Chapter */}
              <button
                type="button"
                onClick={() => {
                  const next = currentChapter < 4 ? currentChapter + 1 : 1;
                  setCurrentChapter(next);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm text-right cursor-pointer"
              >
                <div className="flex items-center justify-end gap-2 text-outline group-hover:text-secondary transition-colors font-label-sm text-label-sm uppercase font-semibold">
                  <span>Next Chapter</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
                <div className="mt-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors block font-semibold">
                    The Secret Unfolded
                  </span>
                  <span className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                    Chapter 3 · 14 min read
                  </span>
                </div>
              </button>
            </div>

            {/* Quick Chapter Index Drawer Accordion / Bar */}
            <div className="p-6 rounded-2xl bg-surface-container-low shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl text-primary">
                    auto_stories
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-serif font-semibold">
                    Serial Progress &amp; Index
                  </h3>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  {currentChapter} of 8 Completed
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CHAPTERS_INDEX.map((chap) => {
                  const isCurrent = chap.number === currentChapter;
                  return (
                    <button
                      key={chap.code}
                      type="button"
                      onClick={() => {
                        setCurrentChapter(chap.number);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`p-3 rounded-xl text-left flex flex-col gap-1 cursor-pointer transition-colors ${
                        isCurrent
                          ? "bg-secondary-fixed text-on-secondary-fixed shadow-xs ring-2 ring-secondary/30"
                          : "bg-surface shadow-xs hover:bg-surface-container-highest"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`font-label-sm text-label-sm font-bold ${
                            isCurrent || chap.completed ? "text-secondary" : "text-outline"
                          }`}
                        >
                          {chap.code}
                        </span>
                        {isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                        ) : chap.completed ? (
                          <span
                            className="material-symbols-outlined text-xs text-secondary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-xs text-outline">
                            lock_open
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-body-ui-sm text-body-ui-sm truncate ${
                          isCurrent ? "font-semibold" : "text-on-surface font-medium"
                        }`}
                      >
                        {chap.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Author Spotlight Dossier Card */}
          <section className="p-8 rounded-2xl bg-surface-container shadow-sm mb-16 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <img
                alt="Author Spotlight Aanya Mehta"
                className="w-24 h-24 rounded-2xl object-cover shadow-md shrink-0"
                src={ASSETS.aanyaMehtaSpotlight}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-label-sm text-label-sm tracking-wider uppercase text-secondary font-bold">
                    Author Spotlight
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                    Published Author
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  {displayAuthorName}
                </h3>
                <p className="font-body-ui-md text-body-ui-md text-on-surface-variant">
                  {displayAuthorName} writes about forgotten inheritances, quiet crimes in cold
                  climates, and the ghosts we manufacture to survive grief. Her novel{" "}
                  <em className="italic">The Glass Cartographer</em> won the 2024 StoryVerse Prize
                  for Prose.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-primary">menu_book</span>
                <span>
                  More from this universe:{" "}
                  <strong className="text-on-surface font-semibold">The Mahon Chronicles</strong>
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentChapter((c) => (c < 4 ? c + 1 : 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-md text-label-md transition-all shadow-sm cursor-pointer"
                type="button"
              >
                Read Next from {displayAuthorName} →
              </button>
            </div>
          </section>

          {/* Community Discussion & Discourse Forum */}
          <section className="flex flex-col gap-8 mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="font-headline-md text-headline-md text-on-surface font-serif font-semibold">
                  Literary Dialogue
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-bold">
                  {140 + comments.length}
                </span>
              </div>
              {/* Sorting Filters */}
              <div className="flex items-center bg-surface-container p-1 rounded-xl">
                <button
                  onClick={() => setCommentSort("top")}
                  className={`px-3 py-1 rounded-lg font-label-sm text-label-sm transition-colors cursor-pointer ${
                    commentSort === "top"
                      ? "bg-surface text-on-surface font-semibold shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  type="button"
                >
                  Top Reflections
                </button>
                <button
                  onClick={() => setCommentSort("newest")}
                  className={`px-3 py-1 rounded-lg font-label-sm text-label-sm transition-colors cursor-pointer ${
                    commentSort === "newest"
                      ? "bg-surface text-on-surface font-semibold shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  type="button"
                >
                  Newest
                </button>
                <button
                  onClick={() => setCommentSort("editor")}
                  className={`px-3 py-1 rounded-lg font-label-sm text-label-sm transition-colors cursor-pointer ${
                    commentSort === "editor"
                      ? "bg-surface text-on-surface font-semibold shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  type="button"
                >
                  Editor Highlights
                </button>
              </div>
            </div>

            {/* Add Comment Box */}
            <div className="p-5 rounded-2xl bg-surface-container-low shadow-sm flex gap-4">
              <img
                alt="Current reader"
                className="w-10 h-10 rounded-full object-cover shrink-0 mt-1"
                src={ASSETS.userProfile}
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 flex flex-col gap-3">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full bg-surface p-3.5 rounded-xl font-body-ui-sm text-body-ui-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none shadow-xs"
                  placeholder={`Share your interpretation, literary theories, or marginalia on Chapter ${currentChapter}...`}
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-outline">
                    <button
                      onClick={() =>
                        setNewCommentText(
                          (prev) =>
                            `${prev}${prev ? " " : ""}“When the water subsided, only his coat returned...” `
                        )
                      }
                      className="p-1.5 hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                      title="Quote Text Passage"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">format_quote</span>
                    </button>
                    <button
                      onClick={() => setIsSpoiler(!isSpoiler)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSpoiler
                          ? "bg-secondary-fixed text-secondary"
                          : "hover:bg-surface-container"
                      }`}
                      title="Mark as Spoiler"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">visibility_off</span>
                    </button>
                  </div>
                  <button
                    onClick={handlePublishComment}
                    className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-md text-label-md transition-colors shadow-sm cursor-pointer font-semibold"
                    type="button"
                  >
                    Publish Thought
                  </button>
                </div>
              </div>
            </div>

            {/* Threaded Comments Stack */}
            <div className="flex flex-col gap-6">
              {displayedComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-6 rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        alt={comment.authorName}
                        className="w-10 h-10 rounded-full object-cover"
                        src={comment.avatarUrl}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                            {comment.authorName}
                          </span>
                          {comment.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                              {comment.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                          {comment.timeAgo}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onShowToast("Marginalia Permalink", "Comment link copied to clipboard.")
                      }
                      className="text-outline hover:text-on-surface transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">more_horiz</span>
                    </button>
                  </div>

                  {comment.highlightQuote ? (
                    <p className="font-body-editorial-md text-body-editorial-md text-on-surface leading-relaxed">
                      The deliberate mention that the{" "}
                      <span className="bg-secondary/15 px-1 py-0.5 rounded text-primary">
                        &quot;coat had never seen the sea&quot;
                      </span>{" "}
                      practically confirms Arthur orchestrated an escape toward the Continent via the
                      coal barges. Mehta uses the Somerset terrain not merely as gothic
                      window-dressing, but as an accomplice. Notice the pitch seal: diplomat courier
                      protocol of the late twenties.
                    </p>
                  ) : (
                    <p className="font-body-editorial-md text-body-editorial-md text-on-surface leading-relaxed">
                      {comment.content}
                    </p>
                  )}

                  <div className="flex items-center gap-5 pt-2 font-label-md text-label-md text-on-surface-variant">
                    <button
                      onClick={() => handleToggleCommentLike(comment.id)}
                      className={`flex items-center gap-1.5 hover:text-secondary transition-colors group cursor-pointer ${
                        comment.liked ? "text-secondary" : ""
                      }`}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-base group-hover:scale-110"
                        style={{
                          fontVariationSettings:
                            comment.liked || comment.id === "c-1" ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        thumb_up
                      </span>
                      <span className="font-semibold text-on-surface">{comment.likes}</span>
                    </button>
                    <button
                      onClick={() =>
                        setReplyingToId(replyingToId === comment.id ? null : comment.id)
                      }
                      className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">chat_bubble</span>
                      <span>Reply</span>
                    </button>
                    <span className="text-outline-variant">•</span>
                    <button
                      onClick={() =>
                        onShowToast(
                          "Insight Bookmarked",
                          `Saved reflection by ${comment.authorName}`
                        )
                      }
                      className="hover:text-primary transition-colors cursor-pointer"
                      type="button"
                    >
                      Bookmark Insight
                    </button>
                  </div>

                  {/* Inline Reply Box */}
                  {replyingToId === comment.id && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${comment.authorName}...`}
                        className="flex-1 bg-surface px-3 py-2 rounded-lg font-body-ui-sm text-body-ui-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => handlePublishReply(comment.id)}
                        className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>
                  )}

                  {/* Nested Replies */}
                  {comment.replies &&
                    comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="mt-2 ml-4 sm:ml-8 p-4 rounded-xl bg-surface shadow-xs flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            alt={reply.authorName}
                            className="w-8 h-8 rounded-full object-cover"
                            src={reply.avatarUrl}
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex items-center gap-2">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">
                              {reply.authorName}
                            </span>
                            <span className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                              {reply.timeAgo}
                            </span>
                          </div>
                        </div>
                        <p className="font-body-editorial-md text-body-editorial-md text-on-surface-variant leading-relaxed">
                          {reply.content}
                        </p>
                        <div className="flex items-center gap-4 text-outline font-label-sm text-label-sm">
                          <button
                            onClick={() =>
                              onShowToast("Upvoted Reply", `Endorsed ${reply.authorName}'s note`)
                            }
                            className="flex items-center gap-1 hover:text-secondary transition-colors cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-sm">thumb_up</span>{" "}
                            {reply.likes}
                          </button>
                          <button
                            onClick={() => setReplyingToId(comment.id)}
                            className="hover:text-primary transition-colors cursor-pointer"
                            type="button"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bespoke Floating Stationary Reading Toolbar (Docked bottom-center with high elevation) */}
      <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
        <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-xl shadow-xl ring-1 ring-outline-variant/30 text-on-surface">
          {/* Audio Narration Pill */}
          <button
            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all font-label-md text-label-md font-semibold cursor-pointer ${
              isAudioPlaying
                ? "bg-secondary text-on-secondary"
                : "bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary hover:text-on-secondary"
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-lg">
              {isAudioPlaying ? "pause_circle" : "headphones"}
            </span>
            <span className="hidden sm:inline">{isAudioPlaying ? "Playing" : "Listen"}</span>
            <span className="text-xs opacity-75 hidden md:inline">(12m)</span>
          </button>

          <span className="w-px h-6 bg-outline-variant/50 mx-1"></span>

          {/* Text Sizing Controller */}
          <div className="flex items-center bg-surface-container-low rounded-xl p-0.5">
            <button
              onClick={() => setFontSizeIndex((i) => Math.max(0, i - 1))}
              className="px-2.5 py-1 text-on-surface hover:text-primary hover:bg-surface rounded-lg transition-colors font-serif font-bold text-xs cursor-pointer"
              title="Decrease Font Size"
              type="button"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeIndex((i) => Math.min(sizeClasses.length - 1, i + 1))}
              className="px-2.5 py-1 text-on-surface hover:text-primary hover:bg-surface rounded-lg transition-colors font-serif font-bold text-sm cursor-pointer"
              title="Increase Font Size"
              type="button"
            >
              A+
            </button>
          </div>

          {/* Typography Style Switcher (Serif / Sans) */}
          <button
            onClick={() => setIsSerif(!isSerif)}
            className="px-2.5 py-1.5 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md flex items-center gap-1 cursor-pointer"
            title="Toggle Serif / Sans Font"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">font_download</span>
            <span className="hidden md:inline text-xs">{isSerif ? "Serif" : "Sans"}</span>
          </button>

          <span className="w-px h-6 bg-outline-variant/50 mx-1 hidden sm:block"></span>

          {/* Reading Theme Palette Controls (Light / Warm Sepia / Midnight Slate) */}
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
            <button
              onClick={() => setReadingTheme("parchment")}
              className={`w-6 h-6 rounded-full bg-[#fdf8f6] transition-all shadow-xs cursor-pointer ${
                readingTheme === "parchment" ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-primary/50"
              }`}
              title="Parchment Cream"
              type="button"
            ></button>
            <button
              onClick={() => setReadingTheme("sepia")}
              className={`w-6 h-6 rounded-full bg-[#f4ecd8] transition-all shadow-xs cursor-pointer ${
                readingTheme === "sepia" ? "ring-2 ring-tertiary" : "hover:ring-2 hover:ring-tertiary"
              }`}
              title="Antique Sepia"
              type="button"
            ></button>
            <button
              onClick={() => setReadingTheme("night")}
              className={`w-6 h-6 rounded-full bg-[#201d1b] transition-all shadow-xs cursor-pointer ${
                readingTheme === "night" ? "ring-2 ring-secondary" : "hover:ring-2 hover:ring-secondary"
              }`}
              title="Candlelight Dark"
              type="button"
            ></button>
          </div>

          <span className="w-px h-6 bg-outline-variant/50 mx-1"></span>

          {/* Distraction-free Focus Canvas Mode */}
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              focusMode
                ? "text-secondary bg-surface-container"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
            }`}
            title="Toggle Focus Mode"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">center_focus_strong</span>
          </button>

          {/* Bookmark Marker */}
          <button
            onClick={() => onToggleBookmark(displayTitle)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isBookmarked
                ? "text-primary bg-surface-container"
                : "text-on-surface-variant hover:text-secondary hover:bg-surface-container"
            }`}
            title="Quick Bookmark Paragraph"
            type="button"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
};
