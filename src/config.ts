export interface IConfig {
  educhannels: string[];
  staff: string[];
  dayStrings: string[];
  weekStrings: string[];
}
// first value is  on test server then its general-mentoring | top -> support
const config: IConfig = {
  educhannels: ["320635142622150658", "190555208944844800", "190539055539290121", "190539150171176961", "197095601077354496", "192637990109970432", "306878708466057217"],
  staff: [""],
  dayStrings: ["d", "day", "days"],
  weekStrings: ["w", "week", "weeks"],
};

export default config;
