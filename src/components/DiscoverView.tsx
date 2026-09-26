import React, { useEffect, useState } from "react";
import { DISCOVER_STORIES, StoryItem } from "../data/storiesData";

interface DiscoverViewProps {
  initialGenre?: string;
  onOpenStory: (story: StoryItem) => void;
  bookmarkedTitles: string[];
  onToggleBookmark: (title: string) => void;
  likedStories: Record<string, boolean>;
  onToggleLike: (id: string) => void;
  onShowToast: (title: string, message?: string) => void;
}

const GENRES = [
  "All",
  "Romance",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Thriller",
  "Poetry",
  "Drama",
];

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  initialGenre = "All",
  onOpenStory,
  bookmarkedTitles,
  onToggleBookmark,
  likedStories,
  onToggleLike,
  onShowToast,
}) => {
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "latest" | "liked" | "curator">("popular");
  const [timeFilter, setTimeFilter] = useState<"all" | "short" | "medium" | "epic">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  const [showRecommenderModal, setShowRecommenderModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState("Twilight Melancholy");

  useEffect(() => {
    if (initialGenre) {
      setSelectedGenre(initialGenre);
    }
  }, [initialGenre]);

  const sortLabels: Record<typeof sortBy, string> = {
    popular: "Popularity",
    latest: "Latest Releases",
    liked: "Most Liked",
    curator: "Staff Pick",
  };

  const handleResetFilters = () => {
    setSelectedGenre("All");
    setSearchQuery("");
    setSortBy("popular");
    setTimeFilter("all");
    setCurrentPage(1);
  };

  const filteredStories = DISCOVER_STORIES.filter((story) => {
    const matchesGenre =
      selectedGenre === "All" ||
      story.genre.toLowerCase() === selectedGenre.toLowerCase();

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      story.title.toLowerCase().includes(q) ||
      story.author.name.toLowerCase().includes(q) ||
      story.genre.toLowerCase().includes(q) ||
      story.excerpt.toLowerCase().includes(q);

    const matchesTime =
      timeFilter === "all" ||
      (timeFilter === "short" && story.readMinutes < 10) ||
      (timeFilter === "medium" && story.readMinutes >= 10 && story.readMinutes <= 25) ||
      (timeFilter === "epic" && story.readMinutes > 25);

    return matchesGenre && matchesSearch && matchesTime;
  }).sort((a, b) => {
    if (sortBy === "liked") return b.likes - a.likes;
    if (sortBy === "curator") return (b.isStaffPick ? 1 : 0) - (a.isStaffPick ? 1 : 0);
    if (sortBy === "latest") return a.readMinutes - b.readMinutes;
    return 0;
  });

  const formatLikes = (baseLikes: number, isLiked?: boolean) => {
    const count = isLiked ? baseLikes + 1 : baseLikes;
    return count > 999 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  const handleLoadMore = () => {
    if (loadedAll || loadingMore) return;
    setLoadingMore(true);
    window.setTimeout(() => {
      setLoadingMore(false);
      setLoadedAll(true);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Discover Hero & Live Search Header */}
      <section className="relative w-full bg-surface-container-low px-gutter-mobile sm:px-gutter-desktop py-space-xl overflow-hidden">
        <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-2xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full shadow-sm mb-space-md">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              The Curated Folio • Autumn Selection
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile sm:text-display-lg text-on-surface tracking-tight max-w-3xl mb-space-sm font-bold">
            Discover your next story.
          </h1>
          <p className="font-body-editorial-lg text-body-editorial-lg text-on-surface-variant max-w-2xl mb-space-xl">
            Explore thousands of curated novels, short fiction, poetry, and serialized chapters
            crafted for quiet, dedicated reading.
          </p>

          {/* Prominent Search Bar with Quick Shortcuts */}
          <div className="w-full max-w-3xl bg-surface-container-lowest rounded-xl shadow-md p-space-xs flex flex-col sm:flex-row items-center gap-space-xs transition-shadow duration-300 focus-within:shadow-xl">
            <div className="flex items-center gap-space-sm px-space-md w-full flex-1">
              <span className="material-symbols-outlined text-outline text-xl">search</span>
              <input
                className="w-full py-space-sm bg-transparent font-body-ui-md text-body-ui-md text-on-surface placeholder:text-outline focus:outline-none"
                placeholder="Search stories, authors, or genres..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-space-xs text-outline hover:text-on-surface rounded-full cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-space-xs w-full sm:w-auto px-space-xs pb-space-xs sm:pb-0">
              <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1.5 rounded-lg text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm text-secondary">tune</span>
                <span>Filters active</span>
              </div>
              <a
                href="#storyGrid"
                className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-space-lg py-space-sm rounded-lg font-label-lg text-label-lg transition-colors flex items-center gap-space-xs shadow-sm"
              >
                <span>Explore</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-space-lg flex flex-wrap justify-center items-center gap-space-lg text-on-surface-variant font-label-md text-label-md">
            <span className="flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
              <strong>14,280+</strong> Original Compositions
            </span>
            <span className="flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> <strong>1,840</strong>{" "}
              Fellow Writers
            </span>
            <span className="flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> <strong>100%</strong>{" "}
              Archival Typography
            </span>
          </div>
        </div>
      </section>

      {/* Filter & Refinement Engine Bar */}
      <section className="w-full bg-surface-container/95 px-gutter-mobile sm:px-gutter-desktop py-space-lg sticky top-20 z-40 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
          {/* Top Row: Genre Tabs & Dropdown Selectors */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
            {/* Genre Horizontal Pill Scroll */}
            <div className="flex items-center gap-space-xs overflow-x-auto w-full lg:w-auto pb-space-xs lg:pb-0 no-scrollbar">
              {GENRES.map((genre) => {
                const isActive = selectedGenre === genre;
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-secondary text-on-secondary shadow-sm"
                        : "bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
                    }`}
                  >
                    {genre === "All" ? "All Genres" : genre}
                  </button>
                );
              })}
            </div>

            {/* Dropdowns for Sorting & Reading Time */}
            <div className="flex items-center gap-space-sm w-full lg:w-auto justify-end flex-wrap sm:flex-nowrap">
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full bg-surface-container-lowest text-on-surface font-label-md text-label-md py-2 pl-3 pr-8 rounded-lg appearance-none cursor-pointer focus:outline-none shadow-sm"
                >
                  <option value="popular">Sort: Popularity</option>
                  <option value="latest">Sort: Latest Releases</option>
                  <option value="liked">Sort: Most Liked</option>
                  <option value="curator">Sort: Staff Pick</option>
                </select>
                <span className="material-symbols-outlined text-outline text-base absolute right-2.5 top-2.5 pointer-events-none">
                  expand_more
                </span>
              </div>

              <div className="relative flex-1 sm:flex-none">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as typeof timeFilter)}
                  className="w-full bg-surface-container-lowest text-on-surface font-label-md text-label-md py-2 pl-3 pr-8 rounded-lg appearance-none cursor-pointer focus:outline-none shadow-sm"
                >
                  <option value="all">Time: Any Length</option>
                  <option value="short">Short reads (&lt; 10 min)</option>
                  <option value="medium">Medium reads (10 - 25 min)</option>
                  <option value="epic">Epic reads (25+ min)</option>
                </select>
                <span className="material-symbols-outlined text-outline text-base absolute right-2.5 top-2.5 pointer-events-none">
                  hourglass_empty
                </span>
              </div>

              <button
                type="button"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2 bg-surface-container-lowest text-on-surface rounded-lg shadow-sm hover:bg-surface-container-high transition-colors cursor-pointer"
                title="Toggle Layout View"
              >
                <span className="material-symbols-outlined text-base">
                  {viewMode === "grid" ? "grid_view" : "view_agenda"}
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Active Filter Tokens & Summary */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold mr-1">
                Active Criteria:
              </span>
              <span className="inline-flex items-center gap-1 bg-surface-container-lowest px-space-sm py-0.5 rounded-full font-label-sm text-label-sm text-on-surface shadow-sm">
                <span>
                  Genre: <strong className="text-primary font-semibold">{selectedGenre}</strong>
                </span>
              </span>
              <span className="inline-flex items-center gap-1 bg-surface-container-lowest px-space-sm py-0.5 rounded-full font-label-sm text-label-sm text-on-surface shadow-sm">
                <span>
                  Order:{" "}
                  <strong className="text-primary font-semibold">{sortLabels[sortBy]}</strong>
                </span>
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="font-label-sm text-label-sm text-secondary hover:text-on-secondary-container underline underline-offset-4 ml-space-xs font-semibold cursor-pointer"
              >
                Clear all
              </button>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">
              Showing{" "}
              <span className="text-on-surface font-bold">
                {filteredStories.length > 0 ? `1 – ${filteredStories.length}` : "0"}
              </span>{" "}
              of <span className="text-on-surface font-bold">148</span> featured manuscripts
            </div>
          </div>
        </div>
      </section>

      {/* Main 3-Column Story Grid Section */}
      <section className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop py-space-xl w-full">
        {filteredStories.length === 0 ? (
          <div className="bg-surface-container-low rounded-2xl p-space-xl text-center my-8">
            <span className="material-symbols-outlined text-4xl text-secondary mb-2">
              menu_book
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
              No manuscripts match those exact criteria
            </h3>
            <p className="font-body-editorial-md text-body-editorial-md text-on-surface-variant mb-space-lg">
              Try resetting your genre or reading-length filter to explore the full autumn folio.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-space-lg py-space-sm bg-primary text-on-primary rounded-lg font-label-lg text-label-lg cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-xl"
                : "flex flex-col gap-space-lg"
            }
            id="storyGrid"
          >
            {filteredStories.map((story) => {
              const isBookmarked = bookmarkedTitles.includes(story.title);
              const isLiked = !!likedStories[story.id];

              return (
                <article
                  key={story.id}
                  onClick={() => onOpenStory(story)}
                  className={`group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex ${
                    viewMode === "list" ? "flex-col md:flex-row" : "flex-col"
                  } transform hover:-translate-y-1 cursor-pointer`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "h-64 md:h-auto md:w-72 shrink-0" : "h-64 w-full"
                    } overflow-hidden bg-surface-variant`}
                  >
                    <img
                      alt={story.coverAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      src={story.coverUrl}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
                    <span className="absolute top-space-md left-space-md bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm uppercase tracking-wider px-space-sm py-0.5 rounded-full font-bold shadow-sm">
                      {story.genre}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(story.title);
                      }}
                      className={`absolute top-space-md right-space-md w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm hover:text-primary flex items-center justify-center transition-transform active:scale-90 shadow-sm cursor-pointer ${
                        isBookmarked ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{
                          fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        {isBookmarked ? "bookmark" : "bookmark_border"}
                      </span>
                    </button>
                  </div>

                  <div className="p-space-lg flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-space-xs">
                        <span className="material-symbols-outlined text-sm text-secondary">
                          schedule
                        </span>
                        <span>{story.readTime}</span>
                        <span>•</span>
                        <span>{story.chapterInfo}</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface mb-space-xs group-hover:text-primary transition-colors cursor-pointer">
                        {story.title}
                      </h2>
                      <p className="font-body-editorial-md text-body-editorial-md text-on-surface-variant line-clamp-3 mb-space-md">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="pt-space-md flex items-center justify-between bg-surface-container-low px-space-md py-space-sm rounded-lg">
                      <div className="flex items-center gap-space-sm">
                        <img
                          alt={story.author.name}
                          className="w-8 h-8 rounded-full object-cover shadow-xs"
                          src={story.author.avatarUrl}
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-label-md text-label-md font-semibold text-on-surface leading-none">
                              {story.author.name}
                            </span>
                            <span
                              className="material-symbols-outlined text-secondary text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              verified
                            </span>
                          </div>
                          <span className="font-label-sm text-label-sm text-outline">
                            {story.author.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-xs">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleLike(story.id);
                          }}
                          className={`flex items-center gap-1 hover:text-secondary p-space-xs rounded-md transition-colors cursor-pointer ${
                            isLiked ? "text-secondary" : "text-on-surface-variant"
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-lg"
                            style={{
                              fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0",
                            }}
                          >
                            {isLiked ? "favorite" : "favorite_border"}
                          </span>
                          <span className="font-label-sm text-label-sm">
                            {formatLikes(story.likes, isLiked)}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Interactive Reader Engagement Banner / Visual Breakout */}
        <div className="my-space-xl bg-surface-container-high rounded-xl p-space-lg sm:p-space-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-sm">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none"></div>
          <div className="max-w-xl z-10">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block mb-space-xs">
              Curator&apos;s Inscription
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs font-semibold">
              Looking for something entirely bespoke?
            </h3>
            <p className="font-body-editorial-md text-body-editorial-md text-on-surface-variant">
              Tell our literary engine your current disposition, favorite poets, or the exact
              atmospheric setting you crave.
            </p>
          </div>
          <div className="flex items-center gap-space-sm z-10 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setShowRecommenderModal(true)}
              className="w-full md:w-auto px-space-lg py-space-sm bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-lg text-label-lg rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              Open Sanctuary Recommender
            </button>
          </div>
        </div>

        {/* Pagination & Infinite Scroll Actions */}
        <div className="flex flex-col items-center justify-center gap-space-md pt-space-lg pb-space-xl">
          {/* Load More Button with Subtle Loading State */}
          <button
            type="button"
            disabled={loadedAll}
            onClick={handleLoadMore}
            className={`px-space-xl py-space-md bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg rounded-lg shadow-sm transition-all duration-200 flex items-center gap-space-sm group cursor-pointer ${
              loadedAll ? "opacity-70 cursor-default" : ""
            }`}
          >
            <span
              className={`material-symbols-outlined text-secondary transition-transform duration-500 ${
                loadingMore ? "animate-spin" : "group-hover:rotate-180"
              }`}
            >
              sync
            </span>
            <span>
              {loadingMore
                ? "Fetching manuscripts..."
                : loadedAll
                ? "All curated selections up to date"
                : "Load More Stories"}
            </span>
          </button>

          {/* Traditional Page Controls */}
          <div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs rounded-xl shadow-sm mt-space-xs">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setCurrentPage(p);
                  onShowToast(`Folio Page ${p}`, `Displaying Autumn Selection Page ${p} of 12`);
                }}
                className={`w-9 h-9 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
                  currentPage === p
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="px-1 text-outline font-label-md text-label-md">…</span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage(12);
                onShowToast("Folio Page 12", "Displaying Autumn Selection Page 12 of 12");
              }}
              className={`w-9 h-9 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
                currentPage === 12
                  ? "bg-primary text-on-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              12
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
          <span className="font-label-sm text-label-sm text-outline">
            Displaying Page {currentPage} of 12 • Automated archival bookmarking enabled
          </span>
        </div>
      </section>

      {/* Bespoke Sanctuary Recommender Modal */}
      {showRecommenderModal && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowRecommenderModal(false)}
        >
          <div
            className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-xl shadow-2xl border border-outline-variant/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Sanctuary Literary Recommender
              </span>
              <button
                type="button"
                onClick={() => setShowRecommenderModal(false)}
                className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs font-semibold">
              Select your reading disposition
            </h3>
            <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant mb-space-lg">
              Choose an atmospheric mood and our curatorial index will match you with an archival
              manuscript.
            </p>
            <div className="grid grid-cols-2 gap-space-sm mb-space-lg">
              {[
                "Twilight Melancholy",
                "Gothic Fog & Mystery",
                "Monsoon Romance",
                "Cosmic Solitude",
              ].map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`p-space-md rounded-xl text-left font-label-md text-label-md transition-all cursor-pointer ${
                    selectedMood === mood
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-space-sm">
              <button
                type="button"
                onClick={() => setShowRecommenderModal(false)}
                className="px-space-md py-space-xs rounded-lg bg-surface-container text-on-surface font-label-md text-label-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRecommenderModal(false);
                  const matched =
                    selectedMood === "Gothic Fog & Mystery"
                      ? DISCOVER_STORIES[3]
                      : selectedMood === "Monsoon Romance"
                      ? DISCOVER_STORIES[5]
                      : selectedMood === "Cosmic Solitude"
                      ? DISCOVER_STORIES[2]
                      : DISCOVER_STORIES[0];
                  onOpenStory(matched);
                }}
                className="px-space-lg py-space-xs rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold cursor-pointer"
              >
                Open Matched Manuscript →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
