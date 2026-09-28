/**
 * ----------------------------------------------------------------------------
 * Description: Subpage that gives details for the different projects
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import './ProjectDetails.css';
import backIcon from '../../Images/Icons/back.png';
import nextIcon from '../../Images/Icons/next.png';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher.jsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const imageFiles = Object.entries(
  import.meta.glob('../../Images/Projects/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
  })
);
const videoFiles = Object.entries(
  import.meta.glob('../../Images/Projects/*.{mp4,webm,ogg}', {
    eager: true,
    import: 'default',
  })
);
const technologyIconAliases = {
  GitLogo: 'git',
  JavaScript: 'js',
  TypeScript: 'ts',
  XCode: 'xcode',
};
const technologyIcons = Object.fromEntries(
  Object.entries(import.meta.glob('../../Images/Icons/skills/*.svg', {
    eager: true,
    import: 'default',
  })).map(([path, src]) => {
    const filename = path.split('/').pop()?.replace(/\.svg$/, '') ?? '';
    return [technologyIconAliases[filename] ?? filename.toLowerCase(), src];
  })
);
const projectMedia = [
  ...imageFiles.map(([path, src]) => ({ path, src, type: 'image' })),
  ...videoFiles.map(([path, src]) => ({ path, src, type: 'video' })),
];

const pageLabels = {
  en: {
    back: 'Back to projects',
    gallery: 'Gallery',
    description: 'Description',
    specs: 'Specifications',
    links: 'Links',
    source: 'Source code',
    website: 'Website',
    demo: 'Live demo',
    noLinks: 'No project links available yet.',
    noMedia: 'No gallery media available yet.',
    notFound: 'Project not found',
    returnHome: 'Return to portfolio',
    openMedia: 'Open media',
    closeMedia: 'Close media viewer',
    previousMedia: 'Previous gallery item',
    nextMedia: 'Next gallery item',
  },
  de: {
    back: 'Zurück zu den Projekten',
    gallery: 'Galerie',
    description: 'Beschreibung',
    specs: 'Technologien',
    links: 'Links',
    source: 'Quellcode',
    website: 'Webseite',
    demo: 'Live-Demo',
    noLinks: 'Noch keine Projektlinks verfügbar.',
    noMedia: 'Noch keine Galeriemedien verfügbar.',
    notFound: 'Projekt nicht gefunden',
    returnHome: 'Zurück zum Portfolio',
    openMedia: 'Medien öffnen',
    closeMedia: 'Medienansicht schließen',
    previousMedia: 'Vorheriges Galeriebild',
    nextMedia: 'Nächstes Galeriebild',
  },
};

let isRestoringHomeScroll = false;

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';

  window.addEventListener('scroll', () => {
    if (!isRestoringHomeScroll && /^\/my-portfolio\/?$/.test(window.location.pathname)) {
      window.sessionStorage.setItem('projectDetailsHomeScrollY', String(window.scrollY));
    }
  }, { passive: true });

  window.addEventListener('popstate', () => {
    if (!/^\/my-portfolio\/?$/.test(window.location.pathname)) return;

    isRestoringHomeScroll = true;
    const savedScrollY = Number(window.sessionStorage.getItem('projectDetailsHomeScrollY')) || 0;
    window.setTimeout(() => {
      window.scrollTo({ top: savedScrollY, behavior: 'instant' });
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          isRestoringHomeScroll = false;
        });
      });
    }, 100);
  });
}

function getImageName(imagePath) {
  return imagePath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
}

function normalizeProjectName(name) {
  return name.replace(/\s+/g, '').toLowerCase();
}

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [gallerySelection, setGallerySelection] = useState({ projectId: null, index: 0 });
  const [openMedia, setOpenMedia] = useState(null);
  const [mediaLayouts, setMediaLayouts] = useState({});
  const projects = t('projects', { returnObjects: true }) || [];
  const project = projects.find((item) => String(item.id) === id);
  const language = i18n.resolvedLanguage?.startsWith('de') ? 'de' : 'en';
  const labels = pageLabels[language];
  const galleryMedia = project
    ? projectMedia
        .filter(({ path }) => normalizeProjectName(getImageName(path)).startsWith(normalizeProjectName(project.title)))
        .sort((firstMedia, secondMedia) => {
          const firstIsCover = getImageName(firstMedia.path).toLowerCase().includes('cover');
          const secondIsCover = getImageName(secondMedia.path).toLowerCase().includes('cover');
          return Number(secondIsCover) - Number(firstIsCover) ||
            getImageName(firstMedia.path).localeCompare(getImageName(secondMedia.path), undefined, {
              numeric: true,
              sensitivity: 'base',
            });
        })
    : [];
  const selectedImageIndex = gallerySelection.projectId === id ? gallerySelection.index : 0;
  const selectedMediaIndex = openMedia?.projectId === id ? openMedia.index : null;
  const selectedMedia = galleryMedia[selectedImageIndex];
  const mediaLayout = selectedMedia ? mediaLayouts[selectedMedia.path] ?? 'phone' : 'phone';

  function handleBack() {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate('/my-portfolio');
  }

  function changeGalleryItem(direction) {
    if (galleryMedia.length < 2) return;

    setGallerySelection((selection) => {
      const currentIndex = selection.projectId === id ? selection.index : 0;
      return {
        projectId: id,
        index: (currentIndex + direction + galleryMedia.length) % galleryMedia.length,
      };
    });
  }

  function updateMediaLayout(path, width, height) {
    const layout = width > height ? 'desktop' : 'phone';
    setMediaLayouts((currentLayouts) => (
      currentLayouts[path] === layout ? currentLayouts : { ...currentLayouts, [path]: layout }
    ));
  }

  useEffect(() => {
    if (
      galleryMedia.length < 2 ||
      selectedMediaIndex !== null ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return undefined;

    const intervalId = window.setInterval(() => {
      setGallerySelection((selection) => ({
        projectId: id,
        index: ((selection.projectId === id ? selection.index : 0) + 1) % galleryMedia.length,
      }));
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [galleryMedia.length, id, selectedMediaIndex]);

  useEffect(() => {
    if (selectedMediaIndex === null) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpenMedia(null);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMediaIndex]);

  if (!project) {
    return (
      <main className="projectDetailsPage">
        <div className="projectDetailsBackground" aria-hidden="true" />
        <div className="projectDetailsContent projectDetailsNotFound">
          <h1>{labels.notFound}</h1>
          <Link to="/my-portfolio">{labels.returnHome}</Link>
        </div>
      </main>
    );
  }

  const links = [
    { label: labels.source, href: project.github },
    { label: labels.website, href: project.website },
    { label: labels.demo, href: project.demo },
  ].filter(({ href }) => typeof href === 'string' && /^https?:\/\//i.test(href));

  return (
    <main className="projectDetailsPage">
      <div className="projectDetailsBackground" aria-hidden="true" />
      <div className="projectDetailsLanguageSwitcher">
        <LanguageSwitcher />
      </div>
      <div className="projectDetailsContent">
        <header className="projectDetailsHeader">
          <div>
            <div className="projectDetailsHeadingMeta">
              <button
                className="projectDetailsBack"
                type="button"
                onClick={handleBack}
                aria-label={labels.back}
                title={labels.back}
              >
                <img src={backIcon} alt="" aria-hidden="true" />
              </button>
              <p className="projectDetailsIndex">
                {String(projects.indexOf(project) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </header>

        <div className={`projectDetailsOverview projectDetailsOverview--${mediaLayout}`}>
          <section className="projectDetailsGallery" aria-label={labels.gallery}>
            <div className="projectDetailsMainImage">
              {galleryMedia.map((media, index) => (
                <button
                  className={`projectDetailsSlide${index === selectedImageIndex ? ' is-active' : ''}`}
                  key={media.path}
                  type="button"
                  tabIndex={index === selectedImageIndex ? 0 : -1}
                  aria-label={`${labels.openMedia}: ${project.title} ${index + 1}`}
                  aria-hidden={index !== selectedImageIndex}
                  onClick={() => setOpenMedia({ projectId: id, index })}
                >
                  {media.type === 'video' ? (
                    <video
                      className="projectDetailsMedia"
                      src={media.src}
                      autoPlay={index === selectedImageIndex}
                      muted
                      loop
                      playsInline
                      onLoadedMetadata={(event) => updateMediaLayout(media.path, event.currentTarget.videoWidth, event.currentTarget.videoHeight)}
                    />
                  ) : (
                    <img
                      className="projectDetailsMedia"
                      src={media.src}
                      alt={`${project.title} ${labels.gallery}`}
                      onLoad={(event) => updateMediaLayout(media.path, event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)}
                    />
                  )}
                </button>
              ))}
              {galleryMedia.length === 0 && <p>{labels.noMedia}</p>}
            </div>
            <div className="projectDetailsGalleryFooter">
              {galleryMedia.length > 1 && (
                <div className="projectDetailsGalleryNavigation">
                  <button
                    className="projectDetailsGalleryControl projectDetailsGalleryPrevious"
                    type="button"
                    aria-label={labels.previousMedia}
                    onClick={() => changeGalleryItem(-1)}
                  >
                    <img src={backIcon} alt="" />
                  </button>
                  <button
                    className="projectDetailsGalleryControl projectDetailsGalleryNext"
                    type="button"
                    aria-label={labels.nextMedia}
                    onClick={() => changeGalleryItem(1)}
                  >
                    <img src={nextIcon} alt="" />
                  </button>
                </div>
              )}
              {galleryMedia.length > 1 && (
                <div className="projectDetailsProgress" aria-hidden="true">
                  <span style={{ width: `${((selectedImageIndex + 1) / galleryMedia.length) * 100}%` }} />
                </div>
              )}
            </div>
          </section>

          <div className="projectDetailsInformation">
            <h1 className="projectDetailsTitle">{project.title}</h1>
            <div className="projectDetailsInformationContent">
              <section className="projectDetailsSection" aria-label={labels.description}>
                {(project.description || '')
                  .split('\n')
                  .filter((paragraph) => paragraph.trim())
                  .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </section>

              <section className="projectDetailsSection projectDetailsSpecs">
                <h2>{labels.specs}</h2>
                <ul>
                  {(project.languages || []).filter((languageName) => technologyIcons[languageName.toLowerCase()]).map((languageName) => {
                    const technologyIcon = technologyIcons[languageName.toLowerCase()];

                    return (
                      <li key={languageName}>
                        <img src={technologyIcon} alt={languageName} title={languageName} />
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="projectDetailsSection projectDetailsLinks">
                <h2>{labels.links}</h2>
                {links.length > 0 ? (
                  <ul>
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <a href={href} target="_blank" rel="noreferrer">
                          {label}<span aria-hidden="true"> ↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{labels.noLinks}</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>

      {selectedMediaIndex !== null && galleryMedia[selectedMediaIndex] && (
        <dialog
          className="projectDetailsLightbox"
          open
          aria-label={`${project.title} ${labels.gallery}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpenMedia(null);
          }}
          onCancel={(event) => {
            event.preventDefault();
            setOpenMedia(null);
          }}
        >
          <button
            className="projectDetailsLightboxClose"
            type="button"
            aria-label={labels.closeMedia}
            onClick={() => setOpenMedia(null)}
          >
            ×
          </button>
          {galleryMedia[selectedMediaIndex].type === 'video' ? (
            <video src={galleryMedia[selectedMediaIndex].src} controls autoPlay playsInline />
          ) : (
            <img src={galleryMedia[selectedMediaIndex].src} alt={`${project.title} ${labels.gallery}`} />
          )}
        </dialog>
      )}
    </main>
  );
}

export default ProjectDetails;