import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import backIcon from '../../Images/Icons/back.png';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher.jsx';

function renderPolicyInline(text) {
  return text.split(/(\*\*.+?\*\*|\[[^\]]+\]\(mailto:[^)]+\))/g).map((part, index) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    const emailMatch = part.match(/^\[([^\]]+)\]\((mailto:[^)]+)\)$/);

    if (boldMatch) return <strong key={index}>{boldMatch[1]}</strong>;
    if (emailMatch) {
      return <a key={index} href={emailMatch[2]}>{emailMatch[1]}</a>;
    }

    return part;
  });
}

function renderPolicy(text) {
  return text.split(/\n\s*\n/).filter(Boolean).map((block, index) => {
    const trimmedBlock = block.trim();

    if (trimmedBlock.startsWith('## ')) {
      return <h2 key={index}>{renderPolicyInline(trimmedBlock.slice(3))}</h2>;
    }

    if (trimmedBlock.startsWith('# ')) {
      return <h2 key={index}>{renderPolicyInline(trimmedBlock.slice(2))}</h2>;
    }

    return <p key={index}>{renderPolicyInline(trimmedBlock.replace(/\n/g, ' '))}</p>;
  });
}

function ProjectPrivacyPolicy() {
  const { id } = useParams();
  const { t } = useTranslation();
  const projects = t('projects', { returnObjects: true }) || [];
  const project = projects.find((item) => String(item.id) === id);

  if (!project || project.id !== 0) {
    return (
      <main className="projectDetailsPage projectDetailsNotFound">
        <div className="projectDetailsBackground" aria-hidden="true" />
        <div className="projectDetailsContent projectDetailsNotFound">
          <h1>{t('projectNotFound', 'Project not found')}</h1>
          <Link to="/my-portfolio">{t('returnHome', 'Return to portfolio')}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="projectDetailsPage projectPrivacyPolicyPage">
      <div className="projectDetailsBackground" aria-hidden="true" />
      <div className="projectDetailsLanguageSwitcher">
        <LanguageSwitcher />
      </div>
      <div className="projectDetailsContent">
        <header className="projectDetailsHeader">
          <div>
            <div className="projectDetailsHeadingMeta">
              <Link className="projectDetailsBack" to="/my-portfolio/project/0" aria-label={t('back', 'Back to projects')} title={t('back', 'Back to projects')}>
                <img src={backIcon} alt="" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        <section className="projectDetailsSection projectPrivacyPolicyContent">
          <h1 className="projectDetailsTitle">
            {t('privacyPolicyTitle', { projectName: project.title })}
          </h1>
          <div className="projectPrivacyPolicyBody">
            {renderPolicy(t('privacyPolicyText'))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProjectPrivacyPolicy;
