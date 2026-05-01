import Card from "@/components/card";
import Header from "@/components/header";
/* eslint no-shadow: 0 */
import Layout from "@/components/layout";
import Seo from "@/components/seo";

type Props = {
  projects: {
    slug: string;
    title: string;
    areas: string[];
    cover: string;
    background?: string;
    coverHash?: string;
    coverWidth?: number;
    coverHeight?: number;
  }[];
};

const Projects = ({ projects }: Props) => {
  if (projects.length === 0) {
    return (
      <Layout>
        <Header />
        <div className="container py-20 text-center">
          <h2 className="mb-4 text-3xl font-bold">No projects found</h2>
          <p className="text-text-muted">
            It looks like you haven't added any projects yet. Check the README for instructions on
            how to get started!
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo />
      <Header />
      <main className="relative">
        <div className="animate-in slide-in-from-bottom-8 delay-600 duration-700">
          <div className="container -mt-32 grid grid-cols-1 items-start gap-8 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
            {projects.map((project, index) => {
              const val = project.background || "#000000";
              return (
                <Card
                  key={project.slug}
                  eager={index === 0}
                  item={project}
                  overlay={val}
                  aspectRatio="4 / 5"
                />
              );
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Projects;
