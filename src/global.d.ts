declare global {
	var AcFunHelperFg: AcFunHelperFgFrame;
	var CookieStore: CookieStore;
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