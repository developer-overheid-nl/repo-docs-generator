import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import templates from '../templates';
import templateContents from '../templateContents';

interface Props {
  className?: string;
  setGitTemplate: (template: string | null) => void;
}

const TemplateSelector: FC<Props> = ({ className, setGitTemplate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const templateName = location.pathname.replace(/^\//, '');
    setGitTemplate(templateContents[templateName] ?? null);
  }, [location.pathname, setGitTemplate]);

  return (
    <select value={location.pathname} onChange={event => navigate(event.target.value)} className={className}>
      {templates.map(templateName => (
        <option key={templateName} value={`/${templateName}`}>
          {templateName}
        </option>
      ))}
    </select>
  );
};

export default TemplateSelector;
