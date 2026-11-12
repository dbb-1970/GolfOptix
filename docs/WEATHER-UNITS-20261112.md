# Fahrenheit default and course location — 12 November 2026

Calendar temperatures now visibly include F or C on each high and low, including print views. Fahrenheit is the default on real and fictional courses. A versioned browser preference resets the previous ambiguous Celsius selection once; users can explicitly select Celsius again and retain that choice.

Kings Ridge Golf Club has a structured public course address in course-catalog.json: 1950 Kings Ridge Blvd., Clermont, FL 34711, US. Owner supplied and confirmed against https://www.kingsridgegc.com/contact/. Its existing approximate Clermont forecast point is retained and moved into the same course catalog, with America/New_York and F defaults. Forecast configuration is track-scoped from that catalog; courses without configured locations receive no borrowed forecast. The authenticated calendar shows its course address. The weather endpoint retains authorization and restricted National Weather Service URLs.

Daily observation and GDD base temperature entry now use explicitly labeled Fahrenheit values; application entry already used Fahrenheit. Chemical application CSV reports now label and export temperatureF. Stored scientific Celsius readings, raw backup/export schemas, observation CSV import columns (explicit tMinC/tMaxC/tMeanC), degree-day calculations and existing operational records are unchanged. Unit conversion occurs at form boundaries, preserving unknown readings as blank.

Validation: 219 automated tests passed, including the catalog-backed Florida forecast/address metadata. Local demo checks confirmed explicit 84°F / 72°F labels and a saved 68°F observation reopened as 68°F. No real course observations were changed.
