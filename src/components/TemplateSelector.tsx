import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import templates from '../templates';
import { templateUrl } from '../templateSource';

interface Props {
  className?: string;
  setGitTemplate: (template: string | null) => void;
}

const TemplateSelector: FC<Props> = ({ className, setGitTemplate }) => {
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {

      const url = templateUrl(location.pathname.replace(/^\//, ''));

      fetch(url)
        .then(response => response.text())
        .then(text => {
          setGitTemplate(text)
        })
        .catch(error => {
          console.error('Failed to fetch template:', error)
        });
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
