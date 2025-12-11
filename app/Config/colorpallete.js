import { CoolBlue, ElegentPurple, WarmOrange,  FreshGreen, Dark} from "./Theme";



let palette = { ...FreshGreen };

export const colors = {
	...palette,

	primary: palette.brand,
	primaryDark: palette.brandDark,
	card: palette.surface,
	lightBg: palette.background,
	altBg: palette.backgroundAlt,
	faint: palette.faint,
	blue: palette.info,
	couponBlue: palette.coupon,
	savedBox: palette.saved,
	orangeGradient1: palette.gradientStart,
	orangeGradient2: palette.gradientEnd,
	paleYellow: palette.notificationBg,
	gold: palette.highlight,

	// text aliases
	textDark: palette.textPrimary,
	muted: palette.textMuted,
};

export default colors;




