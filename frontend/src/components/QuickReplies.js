import React from 'react';
import { X, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';

export const QuickReplies = ({ templates, onSelect, onClose }) => {
  const { t, language } = useLanguage();

  return (
    <div className="border-t border-border bg-card animate-slide-in-left">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">{t('quickReplies')}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="p-3 cursor-pointer hover:bg-secondary/50 hover:border-primary/50 transition-all group"
              onClick={() => onSelect(template)}
            >
              <h4 className="font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                {language === 'pt' ? template.title : template.titleEn}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {language === 'pt' ? template.text : template.textEn}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickReplies;