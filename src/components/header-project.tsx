import { Link } from "@tanstack/react-router";
import React from "react";

import avatarUrl from "@/assets/avatar.svg";
import leftArrowSvg from "@/assets/left-arrow.svg?raw";
import { siteConfig } from "@/lib/site.config";

import HeaderBackground from "./header-background";

type HeaderProjectProps = {
  title: string;
  areas: string[];
  description?: React.ReactNode;
  date: string;
};

const HeaderProject = ({ title, areas, description = "", date }: HeaderProjectProps) => {
  const { name } = siteConfig;

  return (
    <header className="relative flex justify-center overflow-hidden">
      <HeaderBackground />
      <div className="z-10 container mt-8 mb-32 text-center md:mb-40">
        <div className="animate-in fade-in duration-700">
          <div className="flex justify-center">
            <Link
              to="/"
              aria-label={`${name} - Back to homepage`}
              className="group flex items-center text-heading no-underline transition-all duration-300 hover:text-primary"
            >
              <div
                className="h-[18px] w-5 text-icon-primary transition-transform group-hover:-translate-x-1 group-hover:text-primary"
                dangerouslySetInnerHTML={{ __html: leftArrowSvg }}
              />
              <div className="mx-2 inline-block h-10 w-10 overflow-hidden rounded-full bg-white shadow-md transition-transform group-hover:scale-110">
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-full w-full object-contain p-1.5"
                  />
                )}
              </div>
              <span className="text-lg font-semibold">{name}</span>
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <div className="animate-in slide-in-from-top-8 duration-700">
            <h1 className="mt-4 text-4xl font-bold text-heading md:text-5xl">{title}</h1>
          </div>
          <div className="animate-in fade-in delay-500 duration-700">
            <p className="mt-8 mb-0 text-lg">{date}</p>
            <div className="text-text-muted">
              {areas.map((area, index) => (
                <span key={area}>
                  {index > 0 && ", "}
                  {area}
                </span>
              ))}
            </div>
            {description && (
              <div className="mx-auto mt-12 max-w-[900px] text-left break-words">{description}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderProject;
