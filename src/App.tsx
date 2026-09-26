/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { DiscoverView } from "./components/DiscoverView";
import { Footer } from "./components/Footer";
import { Header, ScreenType } from "./components/Header";
import { HomeView } from "./components/HomeView";
import { ReadingView } from "./components/ReadingView";
import { WriteStoryView } from "./components/WriteStoryView";
import {
  DISCOVER_STORIES,
  HOME_FEATURED_STORIES,
  HOME_TRENDING_STORIES,
  StoryItem,
} from "./data/storiesData";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [discoverGenreFilter, setDiscoverGenreFilter] = useState<string>("All");
  const [activeStory, setActiveStory] = useState<StoryItem | null>(
    HOME_FEATURED_STORIES[0]
  );

  // Shared Interactive State
  const [bookmarkedTitles, setBookmarkedTitles] = useState<string[]>([
    "The Last Letter",
  ]);
  const [likedStories, setLikedStories] = useState<Record<string, boolean>>({});
  const [followedWriters, setFollowedWriters] = useState<Record<string, boolean>>({
    "Elena Vance": true,
  });
  const [darkMode, setDarkMode] = useState(false);

  // Modals & Drawers
  const [showBookmarksDrawer, setShowBookmarksDrawer] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState("");

  // Toast State
  const [toast, setToast] = useState<{
    visible: boolean;
    title: string;
    message: string;
  }>({
    visible: false,
    title: "Added to reading list",
    message: '"The Silent City" saved to your sanctuary folio.',
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Keyboard shortcut Cmd+K / Ctrl+K for Search Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearchModal((prev) => !prev);
      } else if (e.key === "Escape") {
        setShowSearchModal(false);
        setShowBookmarksDrawer(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showToastNotification = (title: string, message?: string) => {
    setToast({
      visible: true,
      title,
      message: message || `"${title}" saved to your sanctuary folio.`,
    });
  };

  useEffect(() => {
    if (!toast.visible) return;
    const timer = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3800);
    return () => window.clearTimeout(timer);
  }, [toast.visible, toast.title, toast.message]);

  const handleNavigate = (
    screen: ScreenType,
    genreFilter?: string,
    sectionId?: string
  ) => {
    if (genreFilter) {
      setDiscoverGenreFilter(genreFilter);
    } else if (screen === "discover") {
      setDiscoverGenreFilter("All");
    }
    setCurrentScreen(screen);

    if (sectionId) {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenStory = (story: StoryItem) => {
    setActiveStory(story);
    setCurrentScreen("reading");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleBookmark = (title: string) => {
    setBookmarkedTitles((prev) => {
      const exists = prev.includes(title);
      if (exists) {
        showToastNotification(
          "Removed from reading list",
          `"${title}" removed from your sanctuary folio.`
        );
        return prev.filter((t) => t !== title);
      } else {
        showToastNotification(
          "Added to reading list",
          `"${title}" saved to your sanctuary folio.`
        );
        return [...prev, title];
      }
    });
  };

  const handleToggleLike = (id: string) => {
    setLikedStories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleFollowWriter = (name: string) => {
    setFollowedWriters((prev) => {
      const nextState = !prev[name];
      showToastNotification(
        nextState ? `Following ${name}` : `Unfollowed ${name}`,
        nextState
          ? `You will receive new serial dispatches from ${name}.`
          : `Removed ${name} from your dispatch feed.`
      );
      return {
        ...prev,
        [name]: nextState,
      };
    });
  };

  const allCatalogStories = [
    ...HOME_FEATURED_STORIES,
    ...HOME_TRENDING_STORIES,
    ...DISCOVER_STORIES,
  ];

  const uniqueStoriesByTitle = Array.from(
    new Map(allCatalogStories.map((s) => [s.title, s])).values()
  );

  const searchResults = uniqueStoriesByTitle.filter((s) => {
    const q = modalSearchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.author.name.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-ui-md text-body-ui-md text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        bookmarksCount={bookmarkedTitles.length}
        onOpenBookmarks={() => setShowBookmarksDrawer(true)}
        onOpenSearchModal={() => setShowSearchModal(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className="w-full pt-20 bg-surface flex-1">
        {currentScreen === "home" && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenStory={handleOpenStory}
            bookmarkedTitles={bookmarkedTitles}
            onToggleBookmark={handleToggleBookmark}
            likedStories={likedStories}
            onToggleLike={handleToggleLike}
            followedWriters={followedWriters}
            onToggleFollowWriter={handleToggleFollowWriter}
            onShowToast={showToastNotification}
          />
        )}

        {currentScreen === "reading" && (
          <ReadingView
            activeStory={activeStory}
            bookmarkedTitles={bookmarkedTitles}
            onToggleBookmark={handleToggleBookmark}
            followedWriters={followedWriters}
            onToggleFollowWriter={handleToggleFollowWriter}
            onShowToast={showToastNotification}
          />
        )}

        {currentScreen === "write-story" && (
          <WriteStoryView
            onNavigate={handleNavigate}
            onPreviewManuscript={handleOpenStory}
            onShowToast={showToastNotification}
          />
        )}

        {currentScreen === "discover" && (
          <DiscoverView
            initialGenre={discoverGenreFilter}
            onOpenStory={handleOpenStory}
            bookmarkedTitles={bookmarkedTitles}
            onToggleBookmark={handleToggleBookmark}
            likedStories={likedStories}
            onToggleLike={handleToggleLike}
            onShowToast={showToastNotification}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenBookmarks={() => setShowBookmarksDrawer(true)}
        onShowToast={showToastNotification}
      />

      {/* Interactive Toast Notification */}
      <div
        className={`fixed bottom-8 right-8 z-50 transform transition-all duration-300 ease-out pointer-events-none ${
          toast.visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <div className="bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-xl flex items-center gap-space-md pointer-events-auto">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary shrink-0">
            <span className="material-symbols-outlined text-base">bookmark_added</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-semibold text-white">
              {toast.title}
            </span>
            <span className="font-body-ui-sm text-body-ui-sm text-neutral-300">
              {toast.message}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setToast((prev) => ({ ...prev, visible: false }))}
            className="text-neutral-400 hover:text-white p-1 ml-space-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </div>

      {/* Sanctuary Reading Bookmarks Drawer */}
      {showBookmarksDrawer && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex justify-end"
          onClick={() => setShowBookmarksDrawer(false)}
        >
          <div
            className="w-full max-w-md bg-surface h-full shadow-2xl p-space-lg flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary">bookmarks</span>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Sanctuary Reading Folio
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBookmarksDrawer(false)}
                  className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <p className="font-body-ui-sm text-body-ui-sm text-on-surface-variant my-space-md">
                Archival manuscripts and chapters saved for quiet, uninterrupted reading.
              </p>

              {bookmarkedTitles.length === 0 ? (
                <div className="p-space-xl text-center bg-surface-container-low rounded-xl">
                  <span className="material-symbols-outlined text-3xl text-outline mb-2">
                    bookmark_border
                  </span>
                  <p className="font-body-editorial-md text-body-editorial-md text-on-surface-variant">
                    Your reading list is currently empty.
                  </p>
                </div>
              ) : (
                <div className="space-y-space-sm">
                  {bookmarkedTitles.map((title) => {
                    const matchedStory =
                      uniqueStoriesByTitle.find((s) => s.title === title) ||
                      HOME_FEATURED_STORIES[0];
                    return (
                      <div
                        key={title}
                        onClick={() => {
                          setShowBookmarksDrawer(false);
                          handleOpenStory(matchedStory);
                        }}
                        className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between gap-space-sm cursor-pointer group"
                      >
                        <div className="flex items-center gap-space-sm min-w-0">
                          <img
                            src={matchedStory.coverUrl}
                            alt={title}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary truncate font-semibold">
                              {title}
                            </h4>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              By {matchedStory.author.name} · {matchedStory.readTime}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleBookmark(title);
                          }}
                          className="p-1.5 text-outline hover:text-error rounded-lg cursor-pointer"
                          title="Remove Bookmark"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-space-md border-t border-outline-variant/30 flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-outline">
                {bookmarkedTitles.length} saved in folio
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowBookmarksDrawer(false);
                  handleNavigate("discover");
                }}
                className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md text-label-md cursor-pointer"
              >
                Explore More Stories
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Command Palette Modal (⌘K) */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-start justify-center pt-24 p-4"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-space-md border-b border-outline-variant/30 flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-xl">search</span>
              <input
                type="text"
                value={modalSearchQuery}
                onChange={(e) => setModalSearchQuery(e.target.value)}
                placeholder="Search manuscripts, authors, or switch screen..."
                className="w-full bg-transparent font-body-ui-md text-body-ui-md text-on-surface placeholder:text-outline focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowSearchModal(false)}
                className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Quick Screen Switcher Bar inside Command Palette */}
            <div className="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center gap-space-xs border-b border-outline-variant/20">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mr-1">
                Jump to Screen:
              </span>
              {(
                [
                  { id: "home", label: "Home Sanctuary", icon: "home" },
                  { id: "reading", label: "Reading View (The Last Letter)", icon: "menu_book" },
                  { id: "write-story", label: "Writer Studio Editor", icon: "edit_note" },
                  { id: "discover", label: "Discover Catalog", icon: "explore" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setShowSearchModal(false);
                    handleNavigate(item.id);
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-label-sm text-label-sm cursor-pointer transition-colors ${
                    currentScreen === item.id
                      ? "bg-primary text-on-primary font-semibold"
                      : "bg-surface hover:bg-surface-container-high text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="max-h-80 overflow-y-auto p-space-sm space-y-1">
              {searchResults.map((story) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => {
                    setShowSearchModal(false);
                    handleOpenStory(story);
                  }}
                  className="w-full text-left p-space-sm rounded-xl hover:bg-surface-container flex items-center justify-between gap-space-md transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <img
                      src={story.coverUrl}
                      alt={story.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                        {story.title}
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                        By {story.author.name} · {story.genre} · {story.readTime}
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline text-base">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
