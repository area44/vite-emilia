export interface SocialMediaEntry {
  title: string;
  href: string;
}

export interface EmiliaConfig {
  name: string;
  location: string;
  assetsPath: string;
  socialMedia: SocialMediaEntry[];
}

const useEmiliaConfig = (): EmiliaConfig => {
  return {
    name: "Emilia",
    location: "VietNam",
    assetsPath: "assets",
    socialMedia: [],
  };
};

export default useEmiliaConfig;
