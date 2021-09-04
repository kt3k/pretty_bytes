// Copyright 2014-2021 Sindre Sorhus. All rights reserved. MIT license.
// Copyright 2021 Yoshiya Hinosawa. All rights reserved. MIT license.

type LocaleOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

/**
 * The options for pretty printing the byte numbers.
 *
 * @property bits Uses bits representation. Default is false.
 * @property binary Uses binary bytes (e.g. kibibyte). Default is false.
 * @property singed Include plus sign for positive numbers.
 * @property locale Uses localized number formatting. If it is set to true, uses default locale on the system. If it's set to string, uses that locale. The given string should be BCP 47 language tag (ref: https://en.wikipedia.org/wiki/IETF_language_tag). You can also give the list of language tags.
 * @property minimumFractionDigits The minimum number of fraction digits to display. If neither minimumFractionDigits or maximumFractionDigits are set, the default behavior is to round to 3 significant digits.
 * @property maximumFractionDigits The maximum number of fraction digits to display. If neither minimumFractionDigits or maximumFractionDigits are set, the default behavior is to round to 3 significant digits.
 */
type PrettyBytesOptions = {
  bits?: boolean;
  binary?: boolean;
  locale?: boolean | string | string[];
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  signed?: boolean;
};

/**
 * Convert bytes to a human readable string: 1337 → 1.34 kB
 *
 * @param num The number to format
 * @param options The options
 */
export function prettyBytes(num: number, options: PrettyBytesOptions = {}): string {
  if (!Number.isFinite(num)) {
    throw new TypeError(`Expected a finite number, got ${typeof num}: ${num}`);
  }

  const UNITS = options.bits
    ? (options.binary ? BIBIT_UNITS : BIT_UNITS)
    : (options.binary ? BIBYTE_UNITS : BYTE_UNITS);

  if (options.signed && num === 0) {
    return ` 0 ${UNITS[0]}`;
  }

  const isNegative = num < 0;
  const prefix = isNegative ? "-" : (options.signed ? "+" : "");

  if (isNegative) {
    num = -num;
  }

  const localeOptions = getLocaleOptions(options);

  if (num < 1) {
    const numberString = toLocaleString(num, options.locale, localeOptions);
    return prefix + numberString + " " + UNITS[0];
  }

  const exponent = Math.min(
    Math.floor(
      options.binary ? Math.log(num) / Math.log(1024) : Math.log10(num) / 3,
    ),
    UNITS.length - 1,
  );
  num /= Math.pow(options.binary ? 1024 : 1000, exponent);

  if (!localeOptions) {
    num = Number(num.toPrecision(3));
  }

  const numberString = toLocaleString(
    num,
    options.locale,
    localeOptions,
  );

  const unit = UNITS[exponent];
  return prefix + numberString + " " + unit;
}

function getLocaleOptions(
  { maximumFractionDigits, minimumFractionDigits }: PrettyBytesOptions,
): LocaleOptions | undefined {
  if (maximumFractionDigits || minimumFractionDigits) {
    return {
      maximumFractionDigits,
      minimumFractionDigits,
    };
  }
}

/**
 * Formats the given number using `Number#toLocaleString`.
 * - If locale is a string, the value is expected to be a locale-key (for example: `de`).
 * - If locale is true, the system default locale is used for translation.
 * - If no value for locale is specified, the number is returned unmodified.
 */
function toLocaleString(
  num: number,
  locale: boolean | string | string[] | undefined,
  options: LocaleOptions | undefined,
): string {
  console.log("num", num);
  console.log("locale", locale);
  console.log("options", options);
  if (typeof locale === "string" || Array.isArray(locale)) {
    return num.toLocaleString(locale, options);
  } else if (locale === true || options !== undefined) {
    return num.toLocaleString(undefined, options);
  }

  return num.toString();
}

const BYTE_UNITS = [
  "B",
  "kB",
  "MB",
  "GB",
  "TB",
  "PB",
  "EB",
  "ZB",
  "YB",
];

const BIBYTE_UNITS = [
  "B",
  "kiB",
  "MiB",
  "GiB",
  "TiB",
  "PiB",
  "EiB",
  "ZiB",
  "YiB",
];

const BIT_UNITS = [
  "b",
  "kbit",
  "Mbit",
  "Gbit",
  "Tbit",
  "Pbit",
  "Ebit",
  "Zbit",
  "Ybit",
];

const BIBIT_UNITS = [
  "b",
  "kibit",
  "Mibit",
  "Gibit",
  "Tibit",
  "Pibit",
  "Eibit",
  "Zibit",
  "Yibit",
];
