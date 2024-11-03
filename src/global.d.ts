import { AcFunHelperBackend } from "./Background/backend";
import { AcFunHelperBgFrame, AcFunHelperFgFrame } from "./Core/Sigularity";
import { AcFunHelperFrontend } from "./Frontend/frontend";
import { GlobalStyleManager } from "./Utils/StyleManager";

declare global {
	var AcFunHelperFg: AcFunHelperFrontend;
	var AcFunHelperBackend: AcFunHelperBackend;
	var CookieStore: CookieStore;
	var alitadebug: boolean;
	var chalk: any;
	var pageInfo: APIs.DougaInfo;
	var browser;
	var AcFunHelperDevKit;
	var AcFunHelperStyleMgr: GlobalStyleManager;
	var documentPictureInPicture: lib.TrustedTypesWindow;
	var player:Player;
	var jQuery:JQuery;
}

declare namespace CookieStore {
	interface ChangeEvent extends Event {
		changed: Array<ChangedEvent>;
		type: "deleted" | "changed";
	}

	interface ChangedEvent extends Event {
		name: string;
	}
}

interface Player {
	destroy():any
}

interface CookieStore {
	onchange: (e: CookieStore.ChangeEvent) => void;
	delete: (name: string) => Promise<undefined>
	delete: (option: { name: string, url: string }) => Promise<undefined>;
	get: (name: string) => Promise<{ domain: string, expires: number, name: string, partitioned: boolean, path: string, sameSite: "strict" | "lax" | "none", secure: boolean, value: string }>;
	get: (option: { name: string, url: string }) => Promise<{ domain: string, expires: number, name: string, partitioned: boolean, path: string, sameSite: "strict" | "lax" | "none", secure: boolean, value: string }>;
	getAll: (name: string) => Promise<{ domain: string, expires: number, name: string, partitioned: boolean, path: string, sameSite: "strict" | "lax" | "none", secure: boolean, value: string }>;
	getAll: (option: { name: string, url: string }) => Promise<{ domain: string, expires: number, name: string, partitioned: boolean, path: string, sameSite: "strict" | "lax" | "none", secure: boolean, value: string }>
	set: (name: string, value: string) => Promise<undefined>;
	set: (option: { domain: string, expires: number, name: string, partitioned: boolean, path: string, sameSite: "strict" | "lax" | "none", secure: boolean, value: string }) => Promise<undefined>;
	addEventListener: (type: string, callback: (e: ?CookieStore.ChangeEvent) => any) => any;
}

export { };