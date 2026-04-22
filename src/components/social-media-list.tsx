import useEmiliaConfig from "../hooks/use-emilia-config";

const SocialMediaList = () => {
  const { socialMedia } = useEmiliaConfig();

  return (
    <>
      {socialMedia.map((entry) => (
        <a key={entry.title} href={entry.href} className="text-primary hover:text-secondary">
          {entry.title}
        </a>
      ))}
    </>
  );
};

export default SocialMediaList;
