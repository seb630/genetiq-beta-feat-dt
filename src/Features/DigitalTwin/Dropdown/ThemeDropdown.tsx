import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import styles from "./ThemeDropdown.module.scss";

interface ThemeOption {
	label: string;
	value: "system" | "dark" | "light";
}

const ThemeDropdown = () => {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	const themes: ThemeOption[] = [
		{ label: "System", value: "system" },
		{ label: "Dark", value: "dark" },
		{ label: "Light", value: "light" },
	];

	// Get current theme label
	const getCurrentThemeLabel = () => {
		if (!mounted) return "System";
		const currentTheme = theme || "system";
		const themeOption = themes.find((t) => t.value === currentTheme);
		return themeOption?.label || "System";
	};

	const handleThemeChange = (selectedTheme: ThemeOption) => {
		if (selectedTheme.value === theme) {
			setIsOpen(false);
			return;
		}

		setTheme(selectedTheme.value);
		setIsOpen(false);
	};

	if (!mounted) {
		return (
			<div className={styles.dropdown}>
				<button className={styles.trigger} type='button' disabled>
					<div className={styles.labelContainer}>
						<div className={styles.label}>System</div>
						<div className={styles.divider} />
						<svg
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className={styles.icon}
						>
							<polyline points='6 9 12 15 18 9'></polyline>
						</svg>
					</div>
				</button>
			</div>
		);
	}

	const currentTheme = theme || "system";

	return (
		<div className={styles.dropdown}>
			<button
				className={styles.trigger}
				onClick={() => setIsOpen(!isOpen)}
				type='button'
			>
				<div className={styles.labelContainer}>
					<div className={styles.label}>{getCurrentThemeLabel()}</div>
					<div className={styles.divider} />
					<svg
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className={`${styles.icon} ${isOpen ? styles.rotated : ""}`}
					>
						<polyline points='6 9 12 15 18 9'></polyline>
					</svg>
				</div>
			</button>

			{isOpen && (
				<div className={styles.menu}>
					{themes.map((themeOption) => (
						<button
							key={themeOption.value}
							className={`${styles.option} ${themeOption.value === currentTheme ? styles.activeOption : ""}`}
							onClick={() => handleThemeChange(themeOption)}
							type='button'
						>
							{themeOption.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ThemeDropdown;

