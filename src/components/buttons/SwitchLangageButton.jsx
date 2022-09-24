import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';

const SwitchLanguageButtons = () => {
  const { t, i18n } = useTranslation();

  const getLanguageButtonVariant = (lng) => (i18n.language === lng ? 'secondary' : 'outline-secondary');

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup
      aria-label="Basic example"
      className="switchLanguageButtonGroup m-1"
    >
      <Button
        variant={getLanguageButtonVariant('ru')}
        onClick={() => handleChangeLanguage('ru')}
      >
        {t('lng.ru')}
      </Button>
      <Button
        variant={getLanguageButtonVariant('en')}
        onClick={() => handleChangeLanguage('en')}
      >
        {t('lng.en')}
      </Button>
    </ButtonGroup>
  );
};

export default SwitchLanguageButtons;
