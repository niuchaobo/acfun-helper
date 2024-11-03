enum avaliableVideoQuality {
  "2160P120HDR" = "2160p120HDR",
  "2160P120" = "2160p120",
  "2160P60HDR" = "2160p60HDR",
  "2160P60" = "2160p60",
  "2160PHDR" = "2160pHDR",
  "2160P" = "2160p",
  "1080P60HDR" = "1080p60HDR",
  "1080P60" = "1080p60",
  "1080P+" = "1080p+",
  "1080PHDR" = "1080pHDR",
  "1080P" = "1080p",
  "720P60" = "720p60",
  "720P" = "720p",
  "540P" = "540p",
  "480P" = "480p",
  "360P" = "360p",
}

interface videoQualitiesType {
  definition?: string;
  disableAutoSwitch?: boolean;
  limitType?: number;
  qualityLabel: string;
  qualityType: string;
  width: number;
  height: number;
  defaultSelect?: boolean;
}

const videoQualitiesRefer: Record<string, videoQualitiesType> = {
  "2160p120HDR": {
    definition: "4K",
    disableAutoSwitch: true,
    limitType: 1,
    qualityLabel: "2160P120 HDR",
    qualityType: "2160p120HDR",
    width: 3840,
    height: 2160,
  },
  "2160p120": {
    limitType: 1,
    disableAutoSwitch: true,
    qualityType: "2160p120",
    qualityLabel: "2160P120",
    definition: "4K",
    width: 3840,
    height: 2160,
  },
  "2160p60HDR": {
    limitType: 1,
    disableAutoSwitch: true,
    qualityType: "2160p60HDR",
    qualityLabel: "2160P60 HDR",
    definition: "4K",
    width: 3840,
    height: 2160,
  },
  "2160p60": {
    limitType: 1,
    disableAutoSwitch: true,
    qualityType: "2160p60",
    qualityLabel: "2160P60",
    definition: "4K",
    width: 3840,
    height: 2160,
  },
  "2160pHDR": {
    limitType: 1,
    disableAutoSwitch: true,
    qualityType: "2160pHDR",
    qualityLabel: "2160P HDR",
    definition: "4K",
    width: 3840,
    height: 2160,
  },
  "2160p": {
    limitType: 1,
    disableAutoSwitch: true,
    qualityType: "2160p",
    qualityLabel: "2160P",
    definition: "4K",
    width: 3840,
    height: 2160,
  },
  "1080p60HDR": {
    limitType: 1,
    qualityType: "1080p60HDR",
    qualityLabel: "1080P60 HDR",
    definition: "HD",
    width: 1920,
    height: 1080,
  },
  "1080p60": {
    limitType: 1,
    qualityType: "1080p60",
    qualityLabel: "1080P60",
    definition: "HD",
    width: 1920,
    height: 1080,
  },
  "1080p+": {
    limitType: 1,
    qualityType: "1080p+",
    qualityLabel: "1080P+",
    definition: "HD",
    width: 1920,
    height: 1080,
  },
  "1080pHDR": {
    limitType: 1,
    qualityType: "1080pHDR",
    qualityLabel: "1080P HDR",
    definition: "HD",
    width: 1920,
    height: 1080,
  },
  "1080p": {
    limitType: 1,
    qualityType: "1080p",
    qualityLabel: "1080P",
    definition: "HD",
    width: 1920,
    height: 1080,
  },
  "720p60": {
    limitType: 1,
    qualityType: "720p60",
    qualityLabel: "720P60",
    width: 1280,
    height: 720,
  },
  "720p": {
    defaultSelect: true,
    qualityType: "720p",
    qualityLabel: "720P",
    width: 1280,
    height: 720,
  },
  "540p": {
    qualityType: "540p",
    qualityLabel: "540P",
    width: 960,
    height: 540,
  },
  "480p": {
    qualityType: "480p",
    qualityLabel: "480P",
    width: 720,
    height: 480,
  },
  "360p": {
    qualityType: "360p",
    qualityLabel: "360P",
    width: 640,
    height: 360,
  },
};

/**
 * 每一千秒所播放的帧数
 * @refer @伯翎飞云[2021年4月8日21:31:47]："电影23.976;60帧如果是NTSC的话是59.94;感知不强方向错了"
 */
const standardFrameRate:Record<string,number> = {
  "24": 23976,
  "25": 25000,
  "30": 29970,
  "60": 59940,
  "120": 120000
}

export const Encylopedia = {
  standardFrameRate,
  avaliableVideoQuality,
  videoQualitiesRefer,
};
