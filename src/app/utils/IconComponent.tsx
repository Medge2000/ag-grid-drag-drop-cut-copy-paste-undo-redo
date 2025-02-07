import React from "react";
import { FaReact, FaNode, FaDownload, FaMicrosoft, FaUndo, FaRedo, FaChevronRight } from "react-icons/fa";
import { SiHtml5, SiCss3, SiTypescript, SiJavascript, SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";
import {
  TbBrandNextjs,
  TbHierarchy2,
  TbFile,
  TbFiles,
  TbFileDownload,
  TbQuestionMark,
  TbSun,
  TbMoon,
} from "react-icons/tb";
import { VscAzureDevops, VscAzure, VscClose } from "react-icons/vsc";

import { BsFiletypeXlsx, BsChevronDoubleRight } from "react-icons/bs";

interface IconComponentProps {
  type: string;
  className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ type, className }) => {
  const iconsMap: { [key: string]: React.ReactElement } = {
    html: <SiHtml5 className={className} />,
    css: <SiCss3 className={className} />,
    react: <FaReact className={className} />,
    typescript: <SiTypescript className={className} />,
    javascript: <SiJavascript className={className} />,
    node: <FaNode className={className} />,
    tailwind: <SiTailwindcss className={className} />,
    mongodb: <SiMongodb className={className} />,
    express: <SiExpress className={className} />,
    microsoft: <FaMicrosoft className={className} />,
    nextjs: <TbBrandNextjs className={className} />,
    azure: <VscAzure className={className} />,
    azuredevops: <VscAzureDevops className={className} />,
    download: <FaDownload className={className} />,
    excel: <BsFiletypeXlsx className={className} />,
    undo: <FaUndo className={className} />,
    redo: <FaRedo className={className} />,
    chevronright: <FaChevronRight className={className} />,
    chevrondoubleright: <BsChevronDoubleRight className={className} />,

    file: <TbFile className={className} />,
    files: <TbFiles className={className} />,
    filedownload: <TbFileDownload className={className} />,
    hierarchy: <TbHierarchy2 className={className} />,
    question: <TbQuestionMark className={className} />,

    close: <VscClose className={className} />,

    sun: <TbSun className={className} />,
    moon: <TbMoon className={className} />,
  };

  return iconsMap[type.toLowerCase()] || null;
};

export default IconComponent;
