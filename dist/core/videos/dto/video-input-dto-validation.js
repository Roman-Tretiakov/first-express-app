"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoInputDtoValidation = exports.createVideoInputDtoValidation = void 0;
const available_resolutions_1 = require("../../enums/available-resolutions");
const error_names_1 = require("../../enums/error-names");
const createVideoInputDtoValidation = (data) => {
    const errors = [];
    if (!data.title)
        errors.push({ field: 'title', message: error_names_1.ErrorNames.TITLE_MISSING_ERROR });
    else {
        if (Object.prototype.toString.call(data.title) !== '[object String]')
            errors.push({ field: 'title', message: error_names_1.ErrorNames.TITLE_TYPE_ERROR });
        else if (data.title.trim().length < 2 || data.title.trim().length > 40)
            errors.push({ field: 'title', message: error_names_1.ErrorNames.TITLE_LENGTH_ERROR });
    }
    if (!data.author)
        errors.push({ field: 'author', message: error_names_1.ErrorNames.AUTHOR_MISSING_ERROR });
    else {
        if (Object.prototype.toString.call(data.author) !== '[object String]')
            errors.push({ field: 'author', message: error_names_1.ErrorNames.AUTHOR_TYPE_ERROR });
        else if (data.author.trim().length < 2 || data.author.trim().length > 20)
            errors.push({ field: 'author', message: error_names_1.ErrorNames.AUTHOR_LENGTH_ERROR });
    }
    if (!data.availableResolutions)
        errors.push({ field: 'availableResolutions', message: error_names_1.ErrorNames.AVAILABLE_RESOLUTIONS_MISSING_ERROR });
    else {
        if (!Array.isArray(data.availableResolutions))
            errors.push({ field: 'availableResolutions', message: error_names_1.ErrorNames.AVAILABLE_RESOLUTIONS_TYPE_ERROR });
        else if (data.availableResolutions.length) {
            const existingResolutions = Object.values(available_resolutions_1.AvailableResolutions);
            if (data.availableResolutions.length > existingResolutions.length ||
                data.availableResolutions.length < 1) {
                errors.push({ field: 'availableResolutions', message: error_names_1.ErrorNames.AVAILABLE_RESOLUTIONS_LENGTH_ERROR });
            }
            for (const resolution of data.availableResolutions) {
                if (!existingResolutions.includes(resolution)) {
                    errors.push({
                        field: 'availableResolutions',
                        message: error_names_1.ErrorNames.AVAILABLE_RESOLUTIONS_VALUE_ERROR + resolution,
                    });
                    break;
                }
            }
        }
    }
    return errors;
};
exports.createVideoInputDtoValidation = createVideoInputDtoValidation;
const updateVideoInputDtoValidation = (data) => {
    const errors = [];
    if ((0, exports.createVideoInputDtoValidation)(data).length > 0) {
        errors.push(...(0, exports.createVideoInputDtoValidation)(data));
        return errors;
    }
    else {
        if (!data.canBeDownloaded)
            errors.push({ field: 'canBeDownloaded', message: error_names_1.ErrorNames.CAN_BE_DOWNLOADED_MISSING_ERROR });
        else if (Object.prototype.toString.call(data.canBeDownloaded) !== '[object Boolean]') {
            errors.push({ field: 'canBeDownloaded', message: error_names_1.ErrorNames.CAN_BE_DOWNLOADED_TYPE_ERROR });
        }
        if (data.minAgeRestriction === undefined || Number.isNaN(data.minAgeRestriction))
            errors.push({ field: 'minAgeRestriction', message: error_names_1.ErrorNames.MIN_AGE_RESTRICTION_MISSING_ERROR });
        else {
            if (Object.prototype.toString.call(data.minAgeRestriction) !== '[object Number]'
                && data.minAgeRestriction !== null)
                errors.push({ field: 'minAgeRestriction', message: error_names_1.ErrorNames.MIN_AGE_RESTRICTION_TYPE_ERROR });
            else if (data.minAgeRestriction !== null) {
                if (data.minAgeRestriction < 1 || data.minAgeRestriction > 18) {
                    errors.push({ field: 'minAgeRestriction', message: error_names_1.ErrorNames.MIN_AGE_RESTRICTION_RANGE_ERROR });
                }
            }
        }
        if (!data.publicationDate)
            errors.push({ field: 'publicationDate', message: error_names_1.ErrorNames.PUBLICATION_DATE_MISSING_ERROR });
        else if (Object.prototype.toString.call(data.publicationDate) !== '[object String]')
            errors.push({ field: 'publicationDate', message: error_names_1.ErrorNames.PUBLICATION_DATE_TYPE_ERROR });
        else {
            const date = new Date(data.publicationDate);
            if (isNaN(date.getTime()))
                errors.push({ field: 'publicationDate', message: error_names_1.ErrorNames.PUBLICATION_DATE_FORMAT_ERROR });
        }
    }
    return errors;
};
exports.updateVideoInputDtoValidation = updateVideoInputDtoValidation;
