import React, { useState } from "react";
import {
  ASSETS,
  FEATURED_WRITERS,
  GENRE_CATEGORIES,
  HOME_FEATURED_STORIES,
  HOME_TRENDING_STORIES,
  StoryItem,
} from "../data/storiesData";
import { ScreenType } from "./Header";

interface HomeViewProps {
  onNavigate: (screen: ScreenType, genreFilter?: string, sectionId?: string) => void;
  onOpenStory: (story: StoryItem) => void;
  bookmarkedTitles: string[];
  onToggleBookmark: (title: string) => void;
  likedStories: Record<string, boolean>;
  onToggleLike: (id: string) => void;
  followedWriters: Record<string, boolean>;
  onToggleFollowWriter: (name: string) => void;
  onShowToast: (title: string, message?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenStory,
  bookmarkedTitles,
  onToggleBookmark,
  likedStories,
  onToggleLike,
  followedWriters,
  onToggleFollowWriter,
  onShowToast,
}) => {
  const [trendingOffset, setTrendingOffset] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [showManifestoModal, setShowManifestoModal] = useState(false);

  const formatLikes = (baseLikes: number, isLiked?: boolean) => {
    const count = isLiked ? baseLikes + 1 : baseLikes;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  const orderedTrending = [
    ...HOME_TRENDING_STORIES.slice(trendingOffset),
    ...HOME_TRENDING_STORIES.slice(0, trendingOffset),
  ];

  const handlePrevTrending = () => {
    setTrendingOffset((prev) =>
      prev === 0 ? HOME_TRENDING_STORIES.length - 1 : prev - 1
    );
  };

  const handleNextTrending = () => {
    setTrendingOffset((prev) => (prev + 1) % HOME_TRENDING_STORIES.length);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    onShowToast(
      "Welcome to the StoryVerse fold",
      "Your first Sunday dawn dispatch is scheduled."
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Subtle ambient top gradient glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-secondary-fixed/30 via-tertiary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop pt-space-xl pb-space-xl lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Hero Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-space-lg">
              {/* Subtle Stats Pill */}
              <div className="inline-flex items-center gap-space-sm bg-surface-container-high/70 backdrop-blur-sm px-space-md py-space-xs rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-md text-label-md text-on-surface-variant font-semibold tracking-wide">
                  25K+ Active Readers · 18K+ Stories Published
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg-mobile sm:text-display-lg text-on-surface tracking-tight leading-tight font-bold">
                Every story deserves <br />
                <span className="italic text-primary font-normal">to be heard.</span>
              </h1>

              <p className="font-body-editorial-lg text-body-editorial-lg text-on-surface-variant max-w-xl">
                Discover unforgettable stories, meet creative writers, and create worlds of your own
                in an intimate sanctuary crafted for literary minds.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <a
                  className="inline-flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-space-xl py-space-md rounded-lg font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                  href="#featured-stories"
                >
                  <span>Explore Stories</span>
                  <span className="material-symbols-outlined text-lg">arrow_downward</span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate("write-story")}
                  className="inline-flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface px-space-xl py-space-md rounded-lg font-label-lg text-label-lg shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">edit_note</span>
                  <span>Start Writing</span>
                </button>
              </div>

              {/* Editorial Credo / Live Readers Ribbon */}
              <div className="pt-space-md flex items-center gap-space-md text-on-surface-variant">
                <div className="flex -space-x-2 overflow-hidden">
                  {ASSETS.readerAvatars.map((avatar, idx) => (
                    <img
                      key={idx}
                      alt={`StoryVerse community reader ${idx + 1}`}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-surface object-cover"
                      src={avatar}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold">
                    Community Dispatch
                  </span>
                  <span className="font-body-ui-sm text-body-ui-sm text-on-surface font-medium">
                    Over 1,420 readers exploring right now
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Cinematic Editorial Visual */}
            <div className="lg:col-span-5 relative">
              <div
                onClick={() => onOpenStory(HOME_FEATURED_STORIES[1])}
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-surface-container-high cursor-pointer group"
              >
                <img
                  alt="Cinematic atmospheric photograph of a moonlit reading library desk with an open antique manuscript"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={ASSETS.heroManuscript}
                  referrerPolicy="no-referrer"
                />
                {/* Gradient Scrim for Legibility & Drama */}
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>

                {/* Floating Glassmorphism Book Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md rounded-xl p-space-md shadow-xl border border-surface-container-lowest/30">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider bg-secondary-container text-on-secondary-container px-space-sm py-0.5 rounded-full font-bold">
                      Featured Story
                    </span>
                    <div className="flex items-center text-tertiary-container gap-0.5">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">
                        4.9
                      </span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                    Where the Stars Sleep
                  </h3>
                  <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant flex items-center justify-between mt-1">
                    <span>By Elena Vance</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      <span>8 min read</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 1: STORIES THAT STAY WITH YOU (FEATURED) */}
      <section className="w-full bg-surface-container-low py-space-xl" id="featured-stories">
        <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold block mb-space-xs">
                Curated Anthology
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                Stories that stay with you
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("discover")}
              className="inline-flex items-center gap-space-xs text-primary hover:text-primary-container font-label-lg text-label-lg font-semibold transition-colors cursor-pointer"
            >
              <span>Browse entire library</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {/* 4 Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {HOME_FEATURED_STORIES.map((story, idx) => {
              const isBookmarked = bookmarkedTitles.includes(story.title);
              const isLiked = !!likedStories[story.id];
              const badgeColorClass =
                idx === 1
                  ? "text-secondary"
                  : idx === 3
                  ? "text-tertiary"
                  : "text-primary";

              return (
                <article
                  key={story.id}
                  onClick={() => onOpenStory(story)}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-surface-container">
                    <img
                      alt={story.coverAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={story.coverUrl}
                      referrerPolicy="no-referrer"
                    />
                    <span
                      className={`absolute top-3 left-3 bg-surface/90 backdrop-blur-sm ${badgeColorClass} font-label-sm text-label-sm font-bold px-space-sm py-0.5 rounded shadow-sm uppercase tracking-wider`}
                    >
                      {story.genre}
                    </span>
                    <button
                      aria-label="Bookmark"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(story.title);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 hover:bg-surface flex items-center justify-center transition-colors cursor-pointer ${
                        isBookmarked ? "text-primary" : "text-on-surface"
                      }`}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        style={{
                          fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        {isBookmarked ? "bookmark" : "bookmark_border"}
                      </span>
                    </button>
                  </div>

                  <div className="p-space-lg flex flex-col flex-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1 font-semibold">
                      {story.title}
                    </h3>
                    <p className="font-body-editorial-md text-body-editorial-md text-on-surface-variant line-clamp-3 mt-space-xs mb-space-md flex-1">
                      {story.excerpt}
                    </p>
                    <div className="pt-space-sm flex items-center justify-between border-t-0 bg-surface-container-low/40 -mx-space-lg -mb-space-lg px-space-lg py-space-sm">
                      <div className="flex items-center gap-space-xs">
                        <img
                          alt={story.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                          src={story.author.avatarUrl}
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          {story.author.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          {story.readTime}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleLike(story.id);
                          }}
                          className="flex items-center gap-0.5 hover:text-secondary transition-colors cursor-pointer"
                        >
                          <span
                            className="material-symbols-outlined text-xs text-secondary"
                            style={{
                              fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0",
                            }}
                          >
                            favorite
                          </span>
                          {formatLikes(story.likes, isLiked)}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: TRENDING THIS WEEK */}
      <section className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop py-space-xl w-full">
        <div className="flex items-center justify-between mb-space-xl">
          <div className="flex items-center gap-space-sm">
            <span
              className="material-symbols-outlined text-secondary text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              trending_up
            </span>
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-bold block">
                Community Pulse
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                Trending this week
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Previous trending"
              onClick={handlePrevTrending}
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              aria-label="Next trending"
              onClick={handleNextTrending}
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        {/* 4 Trending Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {orderedTrending.map((story) => {
            const isLiked = !!likedStories[story.id];
            return (
              <div
                key={story.id}
                onClick={() => onOpenStory(story)}
                className="group relative bg-surface-container rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    alt={story.coverAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={story.coverUrl}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm px-space-sm py-0.5 rounded backdrop-blur-sm">
                    {story.genre}
                  </span>
                  {/* Quick action overlay */}
                  <div className="absolute inset-0 bg-inverse-surface/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenStory(story);
                      }}
                      className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-lg py-space-xs rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                      type="button"
                    >
                      Read Story
                    </button>
                  </div>
                </div>
                <div className="p-space-md flex flex-col flex-1">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">visibility</span>{" "}
                      {story.views}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(story.id);
                      }}
                      className="flex items-center gap-1 text-secondary cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{
                          fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        favorite
                      </span>{" "}
                      {formatLikes(story.likes, isLiked)}
                    </button>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1 mb-space-xs font-semibold">
                    {story.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-space-xs pt-space-xs">
                    <img
                      alt={story.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                      src={story.author.avatarUrl}
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-body-ui-sm text-body-ui-sm text-on-surface-variant">
                      {story.author.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: EXPLORE BY GENRE */}
      <section className="w-full bg-surface-container-high py-space-xl" id="explore-genres">
        <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold block mb-space-xs">
              Diverse Canvases
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Explore by Genre
            </h2>
            <p className="font-body-ui-md text-body-ui-md text-on-surface-variant mt-space-xs">
              Immerse yourself in carefully categorized storytelling worlds created by writers from
              across the globe.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-md">
            {GENRE_CATEGORIES.map((genre) => (
              <button
                key={genre.id}
                type="button"
                onClick={() => onNavigate("discover", genre.filterKey)}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-xl transition-all flex flex-col justify-end p-space-md text-left cursor-pointer"
              >
                <img
                  alt={genre.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={genre.imageUrl}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-secondary-fixed/90 via-on-secondary-fixed/30 to-transparent"></div>
                <div className="relative z-10 text-on-primary">
                  <h3 className="font-headline-sm text-headline-sm font-semibold">{genre.name}</h3>
                  <span className="font-label-sm text-label-sm opacity-90 block">
                    {genre.countLabel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: EDITOR'S PICKS (EDITORIAL SPOTLIGHT) */}
      <section
        className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop py-space-xl"
        id="editors-picks"
      >
        <div className="flex flex-col mb-space-lg">
          <div className="flex items-center gap-space-xs text-primary mb-1">
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
              The Editorial Board
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
            Editor&apos;s Picks
          </h2>
        </div>

        {/* Editorial Horizontal Spotlight Card */}
        <div className="bg-surface-container rounded-2xl overflow-hidden shadow-lg p-space-lg lg:p-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Spotlight Visual */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[380px] shadow-md bg-surface-container-high">
              <img
                alt="Evocative cinematic photograph of an old seaside villa in southern Italy at twilight"
                className="w-full h-full object-cover"
                src={ASSETS.editorsPickCover}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider px-space-md py-1 rounded-full shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">workspace_premium</span>
                <span>Editor&apos;s Pick · Spring Issue</span>
              </div>
            </div>

            {/* Spotlight Content */}
            <div className="lg:col-span-7 flex flex-col space-y-space-md">
              <div className="flex flex-wrap items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
                <span className="font-semibold text-secondary">Historical Narrative</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>24 min read
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-secondary">favorite</span>
                  3,480 recommendations
                </span>
              </div>

              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold leading-tight">
                The Cartography of Forgotten Summers
              </h3>

              {/* Pull Quote Excerpt */}
              <blockquote className="bg-surface-container-lowest/80 p-space-md rounded-lg border-l-4 border-primary">
                <p className="font-body-editorial-md text-body-editorial-md italic text-on-surface">
                  “We did not realize that by mapping the shoreline every solstice, we were not
                  recording the sea, but rather the quiet retreat of our youth.”
                </p>
              </blockquote>

              <p className="font-body-ui-md text-body-ui-md text-on-surface-variant leading-relaxed">
                Set against the dramatic limestone cliffs of the Ligurian coast in 1958, this
                luminous novella follows an estranged cartographer and an Italian botanist racing to
                document an unchartered subterranean flora cave before high tide engulfs it forever.
              </p>

              <div className="pt-space-xs flex flex-wrap items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <img
                    alt="Matteo Rossi"
                    className="w-10 h-10 rounded-full object-cover"
                    src={ASSETS.matteoRossiHomeAvatar}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-label-lg text-label-lg font-bold text-on-surface">
                      Matteo Rossi
                    </h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Fellow of European Contemporary Prose
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm">
                  <button
                    aria-label="Bookmark"
                    onClick={() => onToggleBookmark("The Cartography of Forgotten Summers")}
                    className={`p-space-sm hover:bg-surface-container-high rounded-full transition-colors cursor-pointer ${
                      bookmarkedTitles.includes("The Cartography of Forgotten Summers")
                        ? "text-primary"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {bookmarkedTitles.includes("The Cartography of Forgotten Summers")
                        ? "bookmark_added"
                        : "bookmark_add"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenStory({
                        id: "cartography-forgotten-summers",
                        title: "The Cartography of Forgotten Summers",
                        subtitle: "Chapter 1: The Ligurian Solstice, 1958",
                        genre: "Historical Narrative",
                        readTime: "24 min read",
                        readMinutes: 24,
                        excerpt:
                          "Set against the dramatic limestone cliffs of the Ligurian coast in 1958, this luminous novella follows an estranged cartographer and an Italian botanist.",
                        coverUrl: ASSETS.editorsPickCover,
                        coverAlt: "Old seaside villa in southern Italy at twilight",
                        author: {
                          name: "Matteo Rossi",
                          role: "Fellow of European Contemporary Prose",
                          avatarUrl: ASSETS.matteoRossiHomeAvatar,
                          verified: true,
                        },
                        likes: 3480,
                      })
                    }
                    className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-space-xl py-space-sm rounded-lg font-label-lg text-label-lg shadow-sm transition-colors flex items-center gap-space-xs cursor-pointer"
                  >
                    <span>Read Now</span>
                    <span className="material-symbols-outlined text-base">menu_book</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: MEET THE STORYTELLERS (FEATURED WRITERS) */}
      <section className="w-full bg-surface-container-low py-space-xl" id="meet-storytellers">
        <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold block mb-space-xs">
                Voices of StoryVerse
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                Meet the Storytellers
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("discover")}
              className="inline-flex items-center gap-space-xs text-primary hover:text-primary-container font-label-lg text-label-lg font-semibold transition-colors cursor-pointer"
            >
              <span>Explore all authors</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {/* 4 Writer Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {FEATURED_WRITERS.map((writer) => {
              const isFollowing = !!followedWriters[writer.name];
              return (
                <div
                  key={writer.id}
                  className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className="relative mb-space-md">
                    <img
                      alt={writer.name}
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-surface-container"
                      src={writer.avatarUrl}
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 bg-primary text-on-primary p-0.5 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs">verified</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {writer.name}
                  </h3>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold mt-0.5">
                    {writer.specialty}
                  </span>
                  <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant my-space-md line-clamp-3">
                    {writer.bio}
                  </p>
                  <div className="flex items-center justify-center gap-space-lg w-full py-space-xs mb-space-md bg-surface-container-low rounded-lg text-on-surface-variant font-label-sm text-label-sm">
                    <div>
                      <strong className="text-on-surface font-semibold block text-sm">
                        {writer.storiesCount}
                      </strong>{" "}
                      Stories
                    </div>
                    <div>
                      <strong className="text-on-surface font-semibold block text-sm">
                        {writer.followersCount}
                      </strong>{" "}
                      Followers
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleFollowWriter(writer.name)}
                    className={`w-full font-label-md text-label-md py-space-xs rounded-lg transition-colors font-semibold cursor-pointer ${
                      isFollowing
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface"
                    }`}
                    type="button"
                  >
                    {isFollowing ? "Following ✓" : "Follow"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: STORIES ARE BETTER TOGETHER (COMMUNITY IMPACT) */}
      <section
        className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop py-space-xl"
        id="living-guild"
      >
        <div className="relative bg-primary text-on-primary rounded-2xl p-space-lg sm:p-space-xl overflow-hidden shadow-2xl">
          {/* Decorative background wave / typography accent */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary-container/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-7 space-y-space-md">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container font-bold">
                The Living Guild
              </span>
              <h2 className="font-display-md text-display-md-mobile sm:text-display-md text-on-primary font-bold leading-tight">
                Stories are better <br />
                <span className="italic font-normal">together.</span>
              </h2>
              <p className="font-body-editorial-md text-body-editorial-md text-on-primary/90 max-w-xl">
                StoryVerse unites a global collective of thoughtful readers, fearless essayists, and
                devoted storytellers. We believe great literature flourishes through quiet spaces,
                respectful feedback, and shared imagination.
              </p>
              <div className="pt-space-sm flex flex-wrap items-center gap-space-md">
                <button
                  type="button"
                  onClick={() => onNavigate("write-story")}
                  className="bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed hover:text-on-secondary-fixed font-label-lg text-label-lg px-space-xl py-space-md rounded-lg shadow transition-colors font-semibold cursor-pointer"
                >
                  Join the StoryVerse Community
                </button>
                <button
                  type="button"
                  onClick={() => setShowManifestoModal(true)}
                  className="text-on-primary hover:text-on-primary-container font-label-lg text-label-lg flex items-center gap-space-xs underline underline-offset-4 decoration-secondary-container cursor-pointer"
                >
                  Read our manifesto
                </button>
              </div>
            </div>

            {/* Stat Counter Cards Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-space-md">
              <div className="bg-surface/10 backdrop-blur-md rounded-xl p-space-lg text-center">
                <span className="font-display-md text-display-md-mobile sm:text-display-md font-bold text-on-primary block">
                  25K+
                </span>
                <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider font-semibold">
                  Active Readers
                </span>
              </div>
              <div className="bg-surface/10 backdrop-blur-md rounded-xl p-space-lg text-center">
                <span className="font-display-md text-display-md-mobile sm:text-display-md font-bold text-on-primary block">
                  5K+
                </span>
                <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider font-semibold">
                  Dedicated Writers
                </span>
              </div>
              <div className="bg-surface/10 backdrop-blur-md rounded-xl p-space-lg text-center">
                <span className="font-display-md text-display-md-mobile sm:text-display-md font-bold text-on-primary block">
                  18K+
                </span>
                <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider font-semibold">
                  Original Stories
                </span>
              </div>
              <div className="bg-surface/10 backdrop-blur-md rounded-xl p-space-lg text-center">
                <span className="font-display-md text-display-md-mobile sm:text-display-md font-bold text-on-primary block">
                  80+
                </span>
                <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider font-semibold">
                  Countries
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: NEVER MISS A GOOD STORY (NEWSLETTER) */}
      <section className="max-w-4xl mx-auto px-gutter-mobile sm:px-gutter-desktop py-space-xl text-center">
        <div className="bg-surface-container rounded-2xl p-space-lg sm:p-space-xl shadow-md">
          <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-space-md">
            <span className="material-symbols-outlined text-2xl">mark_email_unread</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold block mb-space-xs">
            Weekly Curated Gazette
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-space-xs">
            Never miss a good story
          </h2>
          <p className="font-body-editorial-md text-body-editorial-md text-on-surface-variant max-w-lg mx-auto mb-space-lg">
            Receive hand-picked chapters, intimate craft essays, and author interviews delivered
            gently to your inbox every Sunday dawn.
          </p>

          {!newsletterSubscribed ? (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-space-sm max-w-md mx-auto"
            >
              <input
                className="w-full bg-surface px-space-md py-space-md rounded-lg text-on-surface placeholder:text-outline font-body-ui-sm text-body-ui-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email address"
                required
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button
                className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-space-xl py-space-md rounded-lg font-label-lg text-label-lg font-semibold shadow transition-colors whitespace-nowrap cursor-pointer"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="py-space-md text-primary font-headline-sm text-headline-sm">
              <div className="flex items-center justify-center gap-space-xs">
                <span className="material-symbols-outlined">done_all</span>
                <span>Welcome to the StoryVerse fold. Your first dispatch is on its way.</span>
              </div>
            </div>
          )}

          <p className="font-label-sm text-label-sm text-outline mt-space-md">
            No algorithms, no promotional chatter. Unsubscribe with one click anytime.
          </p>
        </div>
      </section>

      {/* Platform Manifesto Modal */}
      {showManifestoModal && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowManifestoModal(false)}
        >
          <div
            className="bg-surface-container-lowest max-w-xl w-full rounded-2xl p-space-xl shadow-2xl border border-outline-variant/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                The StoryVerse Manifesto
              </span>
              <button
                type="button"
                onClick={() => setShowManifestoModal(false)}
                className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-md font-semibold">
              In Defense of Slow Literature
            </h3>
            <div className="space-y-space-md font-body-editorial-md text-body-editorial-md text-on-surface-variant">
              <p>
                We built StoryVerse as an antidote to endless scrolling feeds. Literature requires
                stillness, generous margins, and the quiet respect of an unhurried reader.
              </p>
              <p>
                Every manuscript published in our archive is typeset in Playfair Display and
                Literata, honoring centuries of bookmaking proportion while empowering living
                writers with direct patronage and archival permanence.
              </p>
            </div>
            <div className="mt-space-lg pt-space-md border-t border-outline-variant/30 flex justify-end gap-space-sm">
              <button
                type="button"
                onClick={() => {
                  setShowManifestoModal(false);
                  onNavigate("write-story");
                }}
                className="bg-primary text-on-primary px-space-lg py-space-xs rounded-lg font-label-md text-label-md cursor-pointer"
              >
                Begin Your Manuscript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
