function num_2_str(number) {
    if (number < 10)
        return '0' + number;
    return number
}

function date_format(date, lang) {
    if (!date instanceof Date) {
        throw "date not Type Date";
    }
    let months = {};
    switch (lang) {
        case 'fr':
            months = [
                'Janvier',
                'Fevrier',
                'Mars',
                'Avril',
                'Mai',
                'Juin',
                'Juillet',
                'Août',
                'Septembre',
                'Octobre',
                'Novembre',
                'Decembre'
            ];
            //console.log(date.getMonth() + ":" + months[date.getMonth()])
            return num_2_str(date.getDate()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' ' + num_2_str(date.getHours()) + ':' + num_2_str(date.getMinutes()) + ':' + num_2_str(date.getSeconds()) + '';
        case 'en':
            months = {
                0: 'January',
                1: 'February',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'August',
                8: 'September',
                9: 'October',
                10: 'November',
                11: 'December'
            };
            let utc_date = date.getDate();
            if (utc_date === 1 || utc_date === 21 || utc_date === 31)
                utc_date += 'st';
            else if (utc_date === 2 || utc_date === 22)
                utc_date += 'nd';
            else if (utc_date === 3 || utc_date === 23)
                utc_date += 'rd';
            else
                utc_date += 'th';
            let ampm = '';
            let hours = date.getHours();
            if (hours > 12) {
                hours = num_2_str(hours - 12);
                ampm = 'PM'
            } else {
                hours = num_2_str(hours);
                ampm = 'AM'
            }
            return months[date.getMonth()] + ', ' + utc_date + ' ' + date.getFullYear() + ' ' + hours + ':' + num_2_str(date.getMinutes()) + ':' + num_2_str(date.getSeconds()) + ampm + '';
        default:
            throw "Unknown Language: " + lang
    }
}

function compact_date(date, translation_dict, lang) {
    //console.log(date + "," + date.getDay() + ',' + date.getMonth() + ',' + date.getDate())
    //console.log(date + "," + date.getDay() + ',' + date.getMonth() + ',' + date.getDate())
    if (!date instanceof Date) throw "date not Type Date"
    if (!lang in translation_dict) throw "Unsupported Language: \"" + lang + "\""
    if (!('days_short' in translation_dict[lang] && 'months' in translation_dict[lang])) {
        //console.warn("days or month not fond in lang " + lang)
        lang = "en"
        if (!('day_short' in translation_dict[lang] && 'months' in translation_dict[lang])) {
            throw "Unsupported Translations dict " + translation_dict
        }
    }
    switch (lang) {
        case 'fr':
            return translation_dict[lang]['days_short'][date.getDay()] + ', ' + num_2_str(date.getDate()) + ' ' + translation_dict[lang]['months'][date.getMonth()];
        default:
            let en_date = date.getDate();
            if (en_date === 1 || en_date === 21 || en_date === 31)
                en_date += 'st';
            else if (en_date === 2 || en_date === 22)
                en_date += 'nd';
            else if (en_date === 3 || en_date === 23)
                en_date += 'rd';
            else
                en_date += 'th';
            return translation_dict[lang]['days_short'][date.getDay()] + ', ' + translation_dict[lang]['months'][date.getMonth()] + ' ' + en_date;

    }


}

function is_valid(valid, lang) {
    if (lang === 'fr') {
        if (valid > 0) {
            return 'Oui'
        } else {
            return 'Non'
        }
    } else {
        if (valid > 0) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

}

function unit_converter(sensor, value, lang, no_unit = false) {
    if (no_unit) {
        if (lang === 'fr') {
            if (sensor === 'AT') {
                return value
            } else if (sensor === 'PRE') {
                return pa_2_mbar(value)
            } else if (sensor === 'HWS') {
                return mps_2_kph(value)
            }
        } else {
            if (sensor === 'AT') {
                return celsius_2_fahrenheit(value)
            } else if (sensor === 'PRE') {
                return pa_2_psi(value)
            } else if (sensor === 'HWS') {
                return mps_2_mph(value)
            }
        }
    } else {
        if (lang === 'fr') {
            if (sensor === 'AT') {
                return value.toFixed(3) + " °C"
            } else if (sensor === 'PRE') {
                return pa_2_mbar(value, 3) + " mBar"
            } else if (sensor === 'HWS') {
                return mps_2_kph(value, 3) + " km/h"
            }
        } else {
            if (sensor === 'AT') {
                return celsius_2_fahrenheit(value, 3) + " °F"
            } else if (sensor === 'PRE') {
                return pa_2_psi(value, 3) + " PSIA"
            } else if (sensor === 'HWS') {
                return mps_2_mph(value, 3) + " mph"
            }
        }
    }
}

function translate(keyword, translation_dict, lang) {
    //console.log(keys)
    if (keyword == null || translation_dict == null || lang == null)
        throw "Incomplete Data for translations:" + keyword + "," + lang + "," + translation_dict
    if (!lang in translation_dict) {
        //console.warn("Language: " + lang + " not available in translation dict");
        lang = 'en';
    }
    let value = translation_dict[lang][keyword];
    if (value == null) {
        value = translation_dict.en[keyword];
        if (value == null) {
            //console.warn("Keyword: " + keyword + " not found in translations dict for language: \"" + lang + "\"");
            return keyword;
        }
    }
    return value
}

function en_date_nbr(date) {
    let utc_date = date.getDate()
    if (utc_date === 1 || utc_date === 21 || utc_date === 31)
        utc_date += 'st';
    else if (utc_date === 2 || utc_date === 22)
        utc_date += 'nd';
    else if (utc_date === 3 || utc_date === 23)
        utc_date += 'rd';
    else
        utc_date += 'th';
    return utc_date
}

function time_span(first_UTC, last_UTC, lang) {
    let out_str = ""
    if (lang === 'fr') {
        const months = {
            0: 'Janvier',
            1: 'Fevrier',
            2: 'Mars',
            3: 'Avril',
            4: 'Mai',
            5: 'Juin',
            6: 'Juillet',
            7: 'Août',
            8: 'Septembre',
            9: 'Octobre',
            10: 'Novembre',
            11: 'Decembre'
        };
        if (last_UTC.getDate() - first_UTC.getDate() !== 0)
            out_str += first_UTC.getDate() + '-' + last_UTC.getDate() + ' '
        else
            out_str += first_UTC.getDate() + ' '

        if (last_UTC.getMonth() - first_UTC.getMonth() !== 0)
            out_str += months[first_UTC.getMonth()] + '-' + months[last_UTC.getMonth()] + ' '
        else
            out_str += months[first_UTC.getMonth()] + ' '

        if (last_UTC.getFullYear() - first_UTC.getFullYear() !== 0)
            out_str += first_UTC.getFullYear() + '-' + last_UTC.getFullYear()
        else
            out_str += first_UTC.getFullYear()
    } else {
        const months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
        if (last_UTC.getMonth() - first_UTC.getMonth() !== 0)
            out_str += months[first_UTC.getMonth()] + '-' + months[last_UTC.getMonth()] + ', '
        else
            out_str += months[first_UTC.getMonth()] + ', '

        if (last_UTC.getDate() - first_UTC.getDate() !== 0)
            out_str += en_date_nbr(first_UTC) + '-' + en_date_nbr(last_UTC) + ' '
        else
            out_str += en_date_nbr(first_UTC) + ' '

        if (last_UTC.getFullYear() - first_UTC.getFullYear() !== 0)
            out_str += first_UTC.getFullYear() + '-' + last_UTC.getFullYear()
        else
            out_str += first_UTC.getFullYear()
    }
    return out_str
}

function celsius_2_fahrenheit(celsius, digits = 3) {
    return ((celsius * (9 / 5)) + 32).toFixed(digits)
}

function mps_2_mph(mps, digits = 3) {
    return (mps * 2.237).toFixed(digits)
}

function mps_2_kph(mps, digits = 3) {
    return (mps * 3.6).toFixed(digits)
}

function pa_2_psi(pa, digits = 6) {
    return (pa / 6895).toFixed(digits)
}

function pa_2_mbar(pa, digits = 3) {
    return (pa * (Math.pow(10, -2))).toFixed(digits)
}

function pa_2_bar(pa, digits = 6) {
    return (pa * (Math.pow(10, -5))).toFixed(digits)
}