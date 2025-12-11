import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageDropdown.module.scss";

interface LanguageOption {
	label: string;
	value: "en" | "de" | "zh";
}

const LanguageDropdown = () => {
	const { i18n, t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);

	const languages: LanguageOption[] = [
		{ label: t("language.english"), value: "en" },
		{ label: t("language.german"), value: "de" },
		{ label: t("language.chinese"), value: "zh" },
	];

	const currentLanguage = languages.find((lang) => lang.value === i18n.language) || languages[0];

	const handleLanguageChange = (language: LanguageOption) => {
		if (language.value === i18n.language) {
			setIsOpen(false);
			return;
		}

		i18n.changeLanguage(language.value);
		setIsOpen(false);
	};

	return (
		<div className={styles.dropdown}>
			<button
				className={styles.trigger}
				onClick={() => setIsOpen(!isOpen)}
				type='button'
			>
				<div className={styles.labelContainer}>
					<div className={styles.label}>{currentLanguage.label}</div>
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
					{languages.map((language) => (
						<button
							key={language.value}
							className={`${styles.option} ${language.value === i18n.language ? styles.activeOption : ""}`}
							onClick={() => handleLanguageChange(language)}
							type='button'
						>
							{language.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageDropdown;

