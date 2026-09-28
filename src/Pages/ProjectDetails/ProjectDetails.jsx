/**
 * ----------------------------------------------------------------------------
 * Description: Subpage that gives details for the different projects
 * ----------------------------------------------------------------------------
 * Author: Léon Albert
 * ----------------------------------------------------------------------------
 */

import './ProjectDetails.css';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const projectImages = Object.entries(
  import.meta.glob('../../Images/Projects/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
  })
);

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
    notFound: 'Project not found',
    returnHome: 'Return to portfolio',
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
    notFound: 'Projekt nicht gefunden',
    returnHome: 'Zurück zum Portfolio',
  },
};

let homeScrollY = 0;

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';

  window.addEventListener('scroll', () => {
    if (/^\/my-portfolio\/?$/.test(window.location.pathname)) {
      homeScrollY = window.scrollY;
    }
  }, { passive: true });

  window.addEventListener('popstate', () => {
    if (!/^\/my-portfolio\/?$/.test(window.location.pathname)) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => window.scrollTo(0, homeScrollY));
    });
  });
}

function getImageName(imagePath) {
  return imagePath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
}

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [gallerySelection, setGallerySelection] = useState({ projectId: null, index: 0 });
  const projects = t('projects', { returnObjects: true }) || [];
  const project = projects.find((item) => String(item.id) === id);
  const language = i18n.resolvedLanguage?.startsWith('de') ? 'de' : 'en';
  const labels = pageLabels[language];

  function handleBack() {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate('/my-portfolio');
  }

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

  const galleryImages = projectImages
    .filter(([imagePath]) => getImageName(imagePath).startsWith(project.title))
    .sort(([firstPath], [secondPath]) => {
      const firstIsCover = getImageName(firstPath).toLowerCase().includes('cover');
      const secondIsCover = getImageName(secondPath).toLowerCase().includes('cover');
      return Number(secondIsCover) - Number(firstIsCover);
    })
    .map(([, image]) => image);
  const selectedImageIndex = gallerySelection.projectId === id ? gallerySelection.index : 0;
  const links = [
    { label: labels.source, href: project.github },
    { label: labels.website, href: project.website },
    { label: labels.demo, href: project.demo },
  ].filter(({ href }) => typeof href === 'string' && /^https?:\/\//i.test(href));

  return (
    <main className="projectDetailsPage">
      <div className="projectDetailsBackground" aria-hidden="true" />
      <div className="projectDetailsContent">
        <button className="projectDetailsBack" type="button" onClick={handleBack}>
          <span aria-hidden="true">←</span> {labels.back}
        </button>

        <header className="projectDetailsHeader">
          <p className="projectDetailsIndex">
            {String(projects.indexOf(project) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
          <h1>{project.title}</h1>
        </header>

        <div className="projectDetailsOverview">
          <section className="projectDetailsGallery" aria-labelledby="project-gallery-title">
            <h2 id="project-gallery-title">{labels.gallery}</h2>
            <div className="projectDetailsMainImage">
              {galleryImages.length > 0 && (
                <img
                  src={galleryImages[selectedImageIndex]}
                  alt={`${project.title} ${labels.gallery}`}
                />
              )}
            </div>
            {galleryImages.length > 1 && (
              <div className="projectDetailsThumbnails">
                {galleryImages.map((image, index) => (
                  <button
                    className={`projectDetailsThumbnail${index === selectedImageIndex ? ' is-selected' : ''}`}
                    key={image}
                    type="button"
                    aria-label={`${labels.gallery} ${index + 1}`}
                    aria-pressed={index === selectedImageIndex}
                    onClick={() => setGallerySelection({ projectId: id, index })}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
            <p className="projectDetailsImageCount">
              {String(selectedImageIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
            </p>
          </section>

          <div className="projectDetailsInformation">
            <section className="projectDetailsSection">
              <h2>{labels.description}</h2>
              {(project.description || '')
                .split('\n')
                .filter((paragraph) => paragraph.trim())
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </section>

            <section className="projectDetailsSection projectDetailsSpecs">
              <h2>{labels.specs}</h2>
              <ul>
                {(project.languages || []).map((languageName) => (
                  <li key={languageName}>{languageName}</li>
                ))}
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
    </main>
  );
}

export default ProjectDetails;