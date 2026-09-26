import React, { useRef, useState } from "react";
import { ASSETS, StoryItem } from "../data/storiesData";
import { ScreenType } from "./Header";

interface WriteStoryViewProps {
  onNavigate: (screen: ScreenType) => void;
  onPreviewManuscript: (story: StoryItem) => void;
  onShowToast: (title: string, message?: string) => void;
}

interface DraftChapter {
  id: string;
  numberLabel: string;
  title: string;
  words: number;
  status: "Complete" | "In progress" | "Outline notes";
}

export const WriteStoryView: React.FC<WriteStoryViewProps> = ({
  onNavigate,
  onPreviewManuscript,
  onShowToast,
}) => {
  const [zenMode, setZenMode] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(true);
  const [metadataExpanded, setMetadataExpanded] = useState(true);

  // Story Metadata State
  const [storyTitle, setStoryTitle] = useState("The House Beyond the Woods");
  const [subtitle, setSubtitle] = useState(
    "Some secrets linger in the shadows longer than the daylight dares to pierce."
  );
  const [primaryGenre, setPrimaryGenre] = useState("Mystery / Psychological Thriller");
  const [tags, setTags] = useState<string[]>(["#Gothic", "#Suspense", "#FolkLore"]);
  const [newTagInput, setNewTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [synopsis, setSynopsis] = useState(
    "When Evelyn inherits her estranged grandfather's derelict estate bordered by ancient Blackwood pines, she expects dust and unpaid taxes. Instead, the clockwork phonograph in the study still turns on its own at dusk, spinning recordings of conversations she had when she was six years old."
  );

  // Chapters List
  const [chapters, setChapters] = useState<DraftChapter[]>([
    {
      id: "ch-1",
      numberLabel: "Chapter One",
      title: "Chapter 1: The Hollow Tree",
      words: 2320,
      status: "Complete",
    },
    {
      id: "ch-2",
      numberLabel: "Chapter Two",
      title: "Chapter 2: Footsteps in the Fog",
      words: 1480,
      status: "In progress",
    },
    {
      id: "ch-3",
      numberLabel: "Chapter Three",
      title: "Chapter 3: The Blackwood Lantern",
      words: 0,
      status: "Outline notes",
    },
  ]);
  const [activeChapterId, setActiveChapterId] = useState("ch-2");

  // Live Editor State
  const [chapterHeading, setChapterHeading] = useState("Footsteps in the Fog");
  const [wordCount, setWordCount] = useState(1480);
  const [readTimeMinutes, setReadTimeMinutes] = useState(6);
  const [autosaveStatus, setAutosaveStatus] = useState("Saved just now (Cloud sync active)");
  const [fontPtSize, setFontPtSize] = useState<"18pt" | "20pt" | "16pt">("18pt");

  // Publishing Suite State
  const [visibility, setVisibility] = useState<"Public" | "Unlisted" | "Private">("Public");
  const [scheduleRelease, setScheduleRelease] = useState(true);
  const [advisoryHorror, setAdvisoryHorror] = useState(true);
  const [advisoryMature, setAdvisoryMature] = useState(false);
  const [advisoryViolence, setAdvisoryViolence] = useState(true);
  const [license, setLicense] = useState(
    "All Rights Reserved (Standard Literary Copyright)"
  );

  const editableProseRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<number | null>(null);

  const handleProseInput = () => {
    if (!editableProseRef.current) return;
    const text = editableProseRef.current.innerText || "";
    const rawWords = text.trim().split(/\s+/).filter(Boolean).length;
    // Keep realistic base manuscript count + delta
    const computedWords = Math.max(120, rawWords + 1295);
    const computedRead = Math.max(1, Math.ceil(computedWords / 245));
    setWordCount(computedWords);
    setReadTimeMinutes(computedRead);

    setAutosaveStatus("Editing draft...");
    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = window.setTimeout(() => {
      setAutosaveStatus("Saved just now (Cloud sync active)");
    }, 900);
  };

  const handleAddChapter = () => {
    const nextNum = chapters.length + 1;
    const newChap: DraftChapter = {
      id: `ch-${Date.now()}`,
      numberLabel: `Chapter ${nextNum}`,
      title: `Chapter ${nextNum}: Untitled Folio`,
      words: 0,
      status: "Outline notes",
    };
    setChapters([...chapters, newChap]);
    setActiveChapterId(newChap.id);
    setChapterHeading(`Untitled Folio`);
    onShowToast("New Chapter Added", `Created ${newChap.title} in your manuscript tree.`);
  };

  const handleSelectChapter = (chap: DraftChapter) => {
    setActiveChapterId(chap.id);
    const cleanHeading = chap.title.replace(/^Chapter\s+\d+:\s*/i, "");
    setChapterHeading(cleanHeading);
    setWordCount(chap.words > 0 ? chap.words : 420);
    setReadTimeMinutes(Math.max(1, Math.ceil((chap.words > 0 ? chap.words : 420) / 245)));
  };

  const handleFormatCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editableProseRef.current?.focus();
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const formatted = newTagInput.trim().startsWith("#")
      ? newTagInput.trim()
      : `#${newTagInput.trim()}`;
    if (!tags.includes(formatted)) {
      setTags([...tags, formatted]);
    }
    setNewTagInput("");
    setShowTagInput(false);
  };

  const handlePreview = () => {
    onPreviewManuscript({
      id: "draft-house-beyond-woods",
      title: storyTitle,
      subtitle: `Chapter 2: ${chapterHeading}`,
      genre: primaryGenre.split("/")[0].trim(),
      readTime: `${readTimeMinutes} min read`,
      readMinutes: readTimeMinutes,
      excerpt: synopsis,
      coverUrl: ASSETS.editorEmbeddedVignette,
      coverAlt: storyTitle,
      author: {
        name: "Yash",
        role: "Senior Editor & Fellow",
        avatarUrl: ASSETS.userProfile,
        verified: true,
      },
      likes: 3420,
    });
  };

  const activeChapterObj =
    chapters.find((c) => c.id === activeChapterId) || chapters[1];

  return (
    <div className="flex flex-col w-full relative">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-16 left-1/3 w-[600px] h-[600px] bg-secondary-fixed/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-96 right-10 w-[450px] h-[450px] bg-primary-fixed/25 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Studio Top Workspace Command Bar */}
      <div className="sticky top-20 z-40 w-full bg-surface/90 backdrop-blur-md px-gutter-mobile sm:px-gutter-desktop py-space-sm flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-space-md min-w-0">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors p-space-xs rounded-lg hover:bg-surface-container font-label-md text-label-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span className="hidden sm:inline">Workspace</span>
          </button>
          <span className="text-outline-variant font-light hidden sm:inline">|</span>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                {storyTitle}
              </span>
              <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-space-xs py-0.5 rounded uppercase tracking-wider shrink-0">
                Draft v2.4
              </span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-ui-sm text-body-ui-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span>{autosaveStatus}</span>
              <span className="text-outline-variant hidden md:inline">·</span>
              <span className="hidden md:inline">Draft autosaving in background</span>
            </div>
          </div>
        </div>

        {/* Top Action CTA cluster */}
        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => setZenMode(!zenMode)}
            className={`hidden lg:flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
              zenMode
                ? "bg-primary text-on-primary"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
            }`}
            title="Distraction-Free Mode"
            type="button"
          >
            <span className="material-symbols-outlined text-base">center_focus_strong</span>
            <span className="hidden xl:inline">{zenMode ? "Exit Zen" : "Zen Mode"}</span>
          </button>

          <button
            onClick={handlePreview}
            className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={() => {
              setAutosaveStatus("Saved just now (Cloud sync active)");
              onShowToast("Draft Saved", `"${storyTitle}" v2.4 synced to archival cloud.`);
            }}
            className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">save</span>
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          <button
            onClick={() =>
              onShowToast(
                "Manuscript Dispatched",
                `"${storyTitle}" has been scheduled for the Weekly Literary Dispatch.`
              )
            }
            className="flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-space-lg py-space-xs rounded-lg font-label-lg text-label-lg shadow-sm transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">publish</span>
            <span>Publish Story</span>
          </button>

          <button
            onClick={() => setShowRightDrawer(!showRightDrawer)}
            className="p-space-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            title="Publishing & Story Settings"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">tune</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Studio Grid */}
      <div className="w-full px-gutter-mobile sm:px-gutter-desktop py-space-lg grid grid-cols-1 xl:grid-cols-12 gap-space-xl">
        {/* LEFT COLUMN: Chapter Navigation & Manuscript Tree (xl:col-span-3) */}
        {!zenMode && (
          <aside className="xl:col-span-3 flex flex-col gap-space-lg">
            {/* Manuscript Progress Summary Bento Card */}
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  Manuscript Progress
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  58% Complete
                </span>
              </div>
              {/* Live SVG Progress Ring / Arc & Word target */}
              <div className="flex items-center gap-space-md mb-space-md">
                <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                    <circle
                      className="text-surface-variant stroke-current"
                      cx="24"
                      cy="24"
                      fill="none"
                      r="20"
                      strokeWidth="4"
                    ></circle>
                    <circle
                      className="text-primary stroke-current"
                      cx="24"
                      cy="24"
                      fill="none"
                      r="20"
                      strokeDasharray="125.6"
                      strokeDashoffset="52.7"
                      strokeLinecap="round"
                      strokeWidth="4"
                    ></circle>
                  </svg>
                  <span className="absolute font-label-sm text-label-sm font-bold text-on-surface">
                    3.8k
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-semibold text-on-surface">
                    Target: 6,500 words
                  </p>
                  <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                    Estimated ~24 min complete novelle
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="bg-surface p-space-sm rounded-lg">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                    Chapters
                  </span>
                  <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    {chapters.length} Drafted
                  </span>
                </div>
                <div className="bg-surface p-space-sm rounded-lg">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                    Reading Pace
                  </span>
                  <span className="font-headline-sm text-headline-sm font-semibold text-secondary">
                    245 wpm
                  </span>
                </div>
              </div>
            </div>

            {/* Chapter Outline List */}
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-lg">
                    auto_stories
                  </span>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Chapters
                  </h3>
                </div>
                <button
                  onClick={handleAddChapter}
                  className="flex items-center gap-space-xs text-secondary hover:text-primary font-label-md text-label-md transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  <span>New</span>
                </button>
              </div>

              <div className="space-y-space-sm">
                {chapters.map((chap) => {
                  const isCurrent = chap.id === activeChapterId;
                  if (isCurrent) {
                    return (
                      <div
                        key={chap.id}
                        onClick={() => handleSelectChapter(chap)}
                        className="p-space-sm bg-primary-fixed/30 rounded-lg cursor-pointer shadow-sm relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
                        <div className="flex items-start justify-between pl-space-xs">
                          <div className="flex items-start gap-space-xs">
                            <span className="material-symbols-outlined text-primary text-base mt-0.5">
                              edit
                            </span>
                            <div>
                              <div className="flex items-center gap-space-xs flex-wrap">
                                <h4 className="font-label-lg text-label-lg font-bold text-on-surface leading-tight">
                                  {chap.title}
                                </h4>
                                <span className="bg-primary text-on-primary font-label-sm text-label-sm px-1.5 py-0.5 rounded-full">
                                  Current
                                </span>
                              </div>
                              <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant mt-0.5">
                                {wordCount.toLocaleString()} words · In progress
                              </p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-secondary text-base">
                            drag_indicator
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={chap.id}
                      onClick={() => handleSelectChapter(chap)}
                      className="group p-space-sm bg-surface rounded-lg cursor-pointer hover:bg-surface-container transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-space-xs">
                          <span className="material-symbols-outlined text-outline text-base mt-0.5 group-hover:text-primary">
                            {chap.status === "Complete" ? "check_circle" : "hourglass_empty"}
                          </span>
                          <div>
                            <h4 className="font-label-lg text-label-lg font-semibold text-on-surface group-hover:text-primary leading-tight">
                              {chap.title}
                            </h4>
                            <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant mt-0.5">
                              {chap.words > 0
                                ? `${chap.words.toLocaleString()} words · ${chap.status}`
                                : `${chap.status} · 0 words`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleAddChapter}
                className="w-full mt-space-md py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-base">post_add</span>
                <span>+ Add New Chapter</span>
              </button>
            </div>

            {/* Story Notes & Moodboard Bento Snippet */}
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  Atmosphere &amp; Mood
                </span>
                <span className="material-symbols-outlined text-outline text-base">palette</span>
              </div>
              <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant italic mb-space-sm">
                &quot;Wet November petrichor, low-hanging marsh fog, flickering amber lantern fuel,
                rusted iron latches.&quot;
              </p>
              <div className="flex items-center gap-space-xs">
                <span
                  className="w-4 h-4 rounded-full bg-[#35251F]"
                  title="Blackwood Timber"
                ></span>
                <span className="w-4 h-4 rounded-full bg-[#8C533C]" title="Aged Brick"></span>
                <span className="w-4 h-4 rounded-full bg-[#C4704F]" title="Lantern Flare"></span>
                <span className="w-4 h-4 rounded-full bg-[#D7C2BB]" title="Morning Mist"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant ml-space-xs">
                  Palette pinned
                </span>
              </div>
            </div>
          </aside>
        )}

        {/* CENTER COLUMN: Editorial Canvas & Distraction-Free Workspace */}
        <div
          className={`${
            zenMode
              ? "xl:col-span-8 xl:col-start-3"
              : showRightDrawer
              ? "xl:col-span-6"
              : "xl:col-span-9"
          } flex flex-col gap-space-lg`}
        >
          {/* Collapsible Story Metadata Header */}
          <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div
              onClick={() => setMetadataExpanded(!metadataExpanded)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-base">
                  bookmark_manager
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Story Metadata &amp; Master Details
                </span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant text-label-sm font-label-sm">
                <span>Click to toggle</span>
                <span className="material-symbols-outlined text-base">
                  {metadataExpanded ? "expand_less" : "expand_more"}
                </span>
              </div>
            </div>

            {metadataExpanded && (
              <div className="mt-space-md space-y-space-md">
                {/* Story Title & Subtitle Fields */}
                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                    Story Title
                  </label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-headline-md text-headline-md text-on-surface focus:outline-none focus:bg-surface-container transition-colors"
                    placeholder="Enter story title..."
                    type="text"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                    Subtitle / Logline
                  </label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-editorial-md text-body-editorial-md text-on-surface focus:outline-none focus:bg-surface-container transition-colors"
                    placeholder="A compelling one-sentence hook..."
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </div>

                {/* Genre Selector & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                      Primary Genre
                    </label>
                    <select
                      value={primaryGenre}
                      onChange={(e) => setPrimaryGenre(e.target.value)}
                      className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-ui-md text-body-ui-md text-on-surface focus:outline-none focus:bg-surface-container cursor-pointer"
                    >
                      <option>Mystery / Psychological Thriller</option>
                      <option>Gothic Horror &amp; Folk Legend</option>
                      <option>Literary Fiction &amp; Intimate Drama</option>
                      <option>Historical Speculation</option>
                      <option>Philosophical Sci-Fi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                      Story Tags
                    </label>
                    <div className="flex flex-wrap items-center gap-space-xs">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-surface-container text-on-surface font-label-sm text-label-sm px-space-sm py-1 rounded-full flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => setTags(tags.filter((t) => t !== tag))}
                            className="material-symbols-outlined text-xs cursor-pointer hover:text-error"
                          >
                            close
                          </button>
                        </span>
                      ))}
                      {showTagInput ? (
                        <form onSubmit={handleAddTag} className="inline-flex items-center gap-1">
                          <input
                            type="text"
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            placeholder="Tag..."
                            className="w-20 bg-surface-container-low px-2 py-0.5 rounded font-label-sm text-label-sm text-on-surface focus:outline-none"
                            autoFocus
                          />
                        </form>
                      ) : (
                        <button
                          onClick={() => setShowTagInput(true)}
                          className="text-primary hover:text-secondary font-label-sm text-label-sm px-space-xs py-1 flex items-center gap-0.5 cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">add</span> Add Tag
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cover Image Upload & Synopsis Split */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md pt-space-xs">
                  {/* Cover Image Preview */}
                  <div className="md:col-span-4 flex flex-col">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                      Editorial Cover
                    </label>
                    <div className="relative w-full h-36 rounded-lg overflow-hidden group shadow-sm bg-surface-container-high">
                      <img
                        alt="Editorial Cover"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={ASSETS.editorCoverPreview}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-space-xs">
                        <button
                          onClick={() =>
                            onShowToast(
                              "Editorial Cover",
                              "Archival 1600x2400 cover plate calibrated."
                            )
                          }
                          className="bg-surface text-on-surface px-space-sm py-1 rounded font-label-sm text-label-sm shadow flex items-center gap-1 cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-xs">edit</span> Change
                        </button>
                      </div>
                    </div>
                    <span className="font-body-ui-sm text-body-ui-sm text-on-surface-variant mt-1 text-center">
                      Suggested 1600x2400 (2:3)
                    </span>
                  </div>

                  {/* Synopsis Field */}
                  <div className="md:col-span-8 flex flex-col">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
                      Short Synopsis
                    </label>
                    <textarea
                      className="w-full flex-1 bg-surface-container-low p-space-sm rounded-lg font-body-editorial-md text-body-editorial-md text-on-surface focus:outline-none focus:bg-surface-container transition-colors resize-none"
                      placeholder="Provide a tantalizing overview for the library catalog..."
                      rows={4}
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Sticky Floating Rich Text Formatting Toolbar */}
          <div className="sticky top-[138px] z-30 bg-surface-container-highest/95 backdrop-blur-md px-space-md py-space-xs rounded-xl shadow-md flex items-center justify-between gap-space-xs overflow-x-auto">
            <div className="flex items-center gap-0.5">
              {/* Text weights & styles */}
              <button
                onClick={() => handleFormatCommand("bold")}
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Bold (⌘B)"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">format_bold</span>
              </button>
              <button
                onClick={() => handleFormatCommand("italic")}
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Italic (⌘I)"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">format_italic</span>
              </button>
              <button
                onClick={() => handleFormatCommand("strikeThrough")}
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Strikethrough"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">strikethrough_s</span>
              </button>

              <div className="w-[1px] h-5 bg-outline-variant mx-1"></div>

              {/* Headings */}
              <button
                onClick={() => handleFormatCommand("formatBlock", "H2")}
                className="px-space-xs py-0.5 rounded hover:bg-surface-container text-on-surface font-headline-sm text-headline-sm font-bold cursor-pointer"
                title="Heading 1"
                type="button"
              >
                H1
              </button>
              <button
                onClick={() => handleFormatCommand("formatBlock", "H3")}
                className="px-space-xs py-0.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-headline-sm text-headline-sm cursor-pointer"
                title="Heading 2"
                type="button"
              >
                H2
              </button>

              <div className="w-[1px] h-5 bg-outline-variant mx-1"></div>

              {/* Literary quotes & lists */}
              <button
                onClick={() => handleFormatCommand("formatBlock", "BLOCKQUOTE")}
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Blockquote"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">format_quote</span>
              </button>
              <button
                onClick={() => handleFormatCommand("insertUnorderedList")}
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Bullet List"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
              </button>
              <button
                onClick={() => handleFormatCommand("insertOrderedList")}
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Numbered List"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">format_list_numbered</span>
              </button>

              <div className="w-[1px] h-5 bg-outline-variant mx-1"></div>

              {/* Insert elements */}
              <button
                onClick={() =>
                  onShowToast("Archival Plate Ready", "Vignette plate Fig. 2.1 anchored in manuscript.")
                }
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Insert Vignette Image"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">image</span>
              </button>
              <button
                onClick={() => handleFormatCommand("insertHorizontalRule")}
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Ornamental Flourish / Divider"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">horizontal_rule</span>
              </button>
              <button
                onClick={() =>
                  onShowToast("Archival Footnote Added", "Marginalia reference [1] appended.")
                }
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Add Archival Footnote"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">note_add</span>
              </button>
            </div>

            <div className="flex items-center gap-space-sm pl-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden md:inline">
                Literata {fontPtSize}
              </span>
              <button
                onClick={() =>
                  setFontPtSize((prev) =>
                    prev === "18pt" ? "20pt" : prev === "20pt" ? "16pt" : "18pt"
                  )
                }
                className="p-space-xs rounded hover:bg-surface-container text-on-surface-variant cursor-pointer"
                title="Editor Typography Preferences"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">text_fields</span>
              </button>
            </div>
          </div>

          {/* Pure Distraction-Free Ivory Writing Sheet */}
          <article
            className="bg-surface-container-lowest rounded-2xl p-space-lg sm:px-12 py-space-xl shadow-lg relative min-h-[820px] transition-all"
            id="editor-sheet"
          >
            {/* Live Chapter Title in manuscript */}
            <div className="mb-space-lg">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold block mb-1">
                {activeChapterObj.numberLabel}
              </span>
              <h2
                className="font-headline-lg text-headline-lg font-bold text-on-surface mb-space-xs outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setChapterHeading(e.currentTarget.textContent || "Footsteps in the Fog")}
              >
                {chapterHeading}
              </h2>
              <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                <span>Manuscript draft</span>
                <span>·</span>
                <span>
                  {wordCount.toLocaleString()} words · ~{readTimeMinutes} min read time
                </span>
              </div>
            </div>

            {/* Flowing Live Editable Prose Section */}
            <div
              ref={editableProseRef}
              onInput={handleProseInput}
              className={`prose font-body-editorial-lg ${
                fontPtSize === "20pt"
                  ? "text-headline-sm"
                  : fontPtSize === "16pt"
                  ? "text-body-editorial-md"
                  : "text-body-editorial-lg"
              } text-on-surface space-y-space-lg outline-none selection:bg-secondary-container selection:text-on-secondary-container`}
              contentEditable
              suppressContentEditableWarning
              spellCheck
            >
              {/* Drop Cap First Paragraph */}
              <p className="leading-relaxed">
                <span className="float-left text-display-lg leading-[0.8] mr-space-sm font-headline-lg text-secondary font-serif">
                  T
                </span>
                he fog did not simply drift into Blackwood Valley; it poured like sour milk poured
                into stagnant pondwater, heavy, deliberate, and chilling every breath down to the
                marrow. By quarter-past five in the afternoon, the timberline had dissolved entirely
                into a wall of chalky dampness. Evelyn stood on the veranda of the high manor, her
                coat collar pulled tight against the nape of her neck, listening for the rhythm she
                had sworn she invented in her sleep.
              </p>

              <p className="leading-relaxed">
                There it came again. Not the wind shifting through the rotting gutters, nor the
                clatter of loose slate shingles. It was the deliberate, slow crush of wet pine
                needles underfoot—measured with the punctuality of an undertaker’s pocketwatch. Two
                paces forward, then a prolonged pause, long enough for the heart to hammer against
                the ribcage twice, followed by the metallic click of a brass lantern latch.
              </p>

              {/* Embedded Editorial Vignette / Illustration */}
              <figure
                className="my-space-xl rounded-xl overflow-hidden shadow-sm bg-surface-container-high"
                contentEditable={false}
              >
                <div className="relative w-full h-80">
                  <img
                    alt="Fine art oil painting of an eerie, isolated wooden Gothic manor bathed in twilight mist"
                    className="w-full h-full object-cover"
                    src={ASSETS.editorEmbeddedVignette}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-space-md">
                    <figcaption className="font-label-md text-label-md text-on-primary italic">
                      Fig. 2.1 — The eastern approach to the Blackwood grounds, documented October
                      1894.
                    </figcaption>
                  </div>
                </div>
              </figure>

              <p className="leading-relaxed">
                “Who’s out there?” she called into the stillness. The sound died immediately against
                the fleece of the mist, robbed of resonance.
              </p>

              <blockquote className="pl-space-lg border-l-0 bg-surface-container-low p-space-md rounded-r-xl italic text-on-surface-variant my-space-lg">
                “The forest remembers what the family attempted to bury beneath the floorboards.
                When the fog climbs the stone stairs, do not answer the front latch, child.”
                <span className="block mt-space-xs font-label-md text-label-md font-semibold uppercase tracking-wider text-secondary">
                  — Excerpt from Tobias Blackwood&apos;s Field Journal
                </span>
              </blockquote>

              <p className="leading-relaxed">
                She reached into her woolen pocket. Her fingers brushed against the brass cylinder
                she had recovered from the phonograph&apos;s hidden carriage that morning. It was
                warm to the touch—impossibly warm, as if it had been basking under the summer midday
                sun rather than resting inside an unheated cedar credenza in a house abandoned for
                nineteen winters.
              </p>

              <p className="leading-relaxed">
                The latch on the garden iron gate groaned. Someone was no longer merely observing
                from the treeline; they had crossed the boundary line where the hemlocks ended and
                the rose briars began.
              </p>
            </div>

            {/* End of Chapter Ornamental Flourish */}
            <div className="my-space-xl flex items-center justify-center gap-space-md text-outline">
              <span className="h-[1px] w-16 bg-surface-variant"></span>
              <span className="material-symbols-outlined text-secondary text-base">eco</span>
              <span className="h-[1px] w-16 bg-surface-variant"></span>
            </div>

            {/* Sticky Floating Bottom Word & Pace Tracker */}
            <div className="sticky bottom-space-md bg-surface/90 backdrop-blur-md rounded-full px-space-md py-space-xs shadow-md mx-auto w-fit flex items-center gap-space-md font-label-md text-label-md text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base text-primary">edit_note</span>
                <span className="font-bold text-on-surface">{wordCount.toLocaleString()}</span>{" "}
                words
              </div>
              <span className="w-1 h-1 rounded-full bg-outline"></span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base text-secondary">
                  schedule
                </span>
                <span>{readTimeMinutes} min read</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-outline"></span>
              <span className="text-secondary font-semibold">Clean Focus Active</span>
            </div>
          </article>
        </div>

        {/* RIGHT COLUMN: Publishing Settings & Release Controls (xl:col-span-3) */}
        {!zenMode && showRightDrawer && (
          <aside className="xl:col-span-3 flex flex-col gap-space-lg">
            {/* Main Publishing Settings Box */}
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-lg">
                    local_library
                  </span>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Publishing Suite
                  </h3>
                </div>
                <span className="material-symbols-outlined text-secondary text-base">
                  verified
                </span>
              </div>

              {/* Visibility Toggle */}
              <div className="mb-space-lg">
                <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-space-xs font-semibold">
                  Story Visibility
                </label>
                <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-lg">
                  {(["Public", "Unlisted", "Private"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setVisibility(mode)}
                      className={`py-space-xs px-2 text-center rounded-md font-label-sm text-label-sm transition-colors cursor-pointer ${
                        visibility === mode
                          ? "bg-surface text-on-surface font-semibold shadow-sm"
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface/50"
                      }`}
                      type="button"
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant mt-1.5">
                  {visibility === "Public"
                    ? "Will be discoverable in the literary catalog and dispatched to subscribers."
                    : visibility === "Unlisted"
                    ? "Accessible only via direct archival folio link."
                    : "Encrypted private manuscript visible only to you."}
                </p>
              </div>

              {/* Release Schedule Option */}
              <div className="mb-space-lg">
                <div className="flex items-center justify-between mb-space-xs">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Schedule Release
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={scheduleRelease}
                      onChange={(e) => setScheduleRelease(e.target.checked)}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-9 h-5 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <div
                  className={`bg-surface p-space-sm rounded-lg space-y-space-xs transition-opacity ${
                    scheduleRelease ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className="flex items-center justify-between text-body-ui-sm font-body-ui-sm">
                    <span className="text-on-surface-variant">Scheduled for:</span>
                    <span className="font-semibold text-on-surface">Tomorrow, 08:00 AM</span>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-sm">schedule_send</span>
                    <span>Sync with Weekly Dispatch #142</span>
                  </div>
                </div>
              </div>

              {/* Content Advisory & Warnings */}
              <div className="mb-space-lg">
                <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-space-xs font-semibold">
                  Content Advisory
                </label>
                <div className="space-y-space-xs">
                  <label className="flex items-center gap-space-xs p-space-xs rounded hover:bg-surface cursor-pointer text-body-ui-sm font-body-ui-sm text-on-surface">
                    <input
                      checked={advisoryHorror}
                      onChange={(e) => setAdvisoryHorror(e.target.checked)}
                      className="rounded accent-primary w-4 h-4"
                      type="checkbox"
                    />
                    <span>Psychological Horror &amp; Dread</span>
                  </label>
                  <label className="flex items-center gap-space-xs p-space-xs rounded hover:bg-surface cursor-pointer text-body-ui-sm font-body-ui-sm text-on-surface">
                    <input
                      checked={advisoryMature}
                      onChange={(e) => setAdvisoryMature(e.target.checked)}
                      className="rounded accent-primary w-4 h-4"
                      type="checkbox"
                    />
                    <span>Explicit / Mature Themes</span>
                  </label>
                  <label className="flex items-center gap-space-xs p-space-xs rounded hover:bg-surface cursor-pointer text-body-ui-sm font-body-ui-sm text-on-surface">
                    <input
                      checked={advisoryViolence}
                      onChange={(e) => setAdvisoryViolence(e.target.checked)}
                      className="rounded accent-primary w-4 h-4"
                      type="checkbox"
                    />
                    <span>Mild Violence &amp; Suspense</span>
                  </label>
                </div>
              </div>

              {/* Copyright & Archival License */}
              <div className="mb-space-lg">
                <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-space-xs font-semibold">
                  Licensing &amp; Rights
                </label>
                <select
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="w-full bg-surface px-space-md py-space-sm rounded-lg font-body-ui-sm text-body-ui-sm text-on-surface focus:outline-none cursor-pointer"
                >
                  <option>All Rights Reserved (Standard Literary Copyright)</option>
                  <option>Creative Commons Attribution (CC BY 4.0)</option>
                  <option>StoryVerse Fellowship Archival Exclusive</option>
                  <option>Public Domain Dedication (CC0)</option>
                </select>
                <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant mt-1.5">
                  You retain 100% intellectual copyright and audio adaptation rights.
                </p>
              </div>

              {/* Primary Call to Action Button in Box */}
              <button
                onClick={() =>
                  onShowToast(
                    "Publication Scheduled",
                    `"${storyTitle}" queued for Weekly Dispatch #142 (Tomorrow, 08:00 AM).`
                  )
                }
                className="w-full bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container py-space-sm px-space-lg rounded-lg font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs transition-colors shadow-sm mb-space-xs cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-base">send_and_archive</span>
                <span>Schedule Publication</span>
              </button>
              <button
                onClick={() =>
                  onShowToast(
                    "Typesetting Archival Folio",
                    `Exported "${storyTitle}" in Playfair & Literata PDF/EPUB.`
                  )
                }
                className="w-full bg-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface py-space-xs px-space-md rounded-lg font-label-md text-label-md flex items-center justify-center gap-1 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Export Clean Manuscript (PDF/EPUB)</span>
              </button>
            </div>

            {/* Author Royalties & Fellowship Note */}
            <div className="bg-surface-container rounded-xl p-space-lg shadow-sm">
              <div className="flex items-center gap-space-xs mb-space-xs">
                <span className="material-symbols-outlined text-primary text-base">
                  workspace_premium
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Fellowship Tier Active
                </span>
              </div>
              <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                Your story qualifies for the Monthly StoryVerse Patron Pool. Readers who spend
                &gt;3 minutes on this draft will generate author honorarium credits directly to your
                account.
              </p>
              <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface font-label-sm text-label-sm">
                <span>Est. Readers Queue:</span>
                <span className="font-bold text-secondary">3,420 Subscribed</span>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
