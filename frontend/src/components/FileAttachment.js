import React, { useState } from 'react';
import { X, Upload, File, Image, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

export const FileAttachment = ({ onSelect, onClose }) => {
  const { language } = useLanguage();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    onSelect(fileArray);
  };

  const quickAttachments = [
    {
      icon: Image,
      label: language === 'pt' ? 'Imagem' : 'Image',
      accept: 'image/*'
    },
    {
      icon: FileText,
      label: language === 'pt' ? 'Documento' : 'Document',
      accept: '.pdf,.doc,.docx'
    },
    {
      icon: File,
      label: language === 'pt' ? 'Arquivo' : 'File',
      accept: '*'
    }
  ];

  return (
    <div className="border-t border-border bg-card animate-slide-in-left">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-foreground">
            {language === 'pt' ? 'Anexar Arquivo' : 'Attach File'}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-all
            ${dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border bg-secondary/30'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            {language === 'pt' 
              ? 'Arraste arquivos aqui ou clique para selecionar' 
              : 'Drag files here or click to select'
            }
          </p>
          <input
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" size="sm" className="cursor-pointer" asChild>
              <span>{language === 'pt' ? 'Selecionar Arquivos' : 'Select Files'}</span>
            </Button>
          </label>
        </div>

        {/* Quick Attachment Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {quickAttachments.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="p-3 cursor-pointer hover:bg-secondary/50 hover:border-primary/50 transition-all text-center"
              >
                <input
                  type="file"
                  accept={item.accept}
                  onChange={handleChange}
                  className="hidden"
                  id={`quick-${index}`}
                  multiple
                />
                <label htmlFor={`quick-${index}`} className="cursor-pointer flex flex-col items-center gap-1">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-foreground">{item.label}</span>
                </label>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FileAttachment;