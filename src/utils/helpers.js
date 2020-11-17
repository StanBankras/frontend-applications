// Replace all occurences of the <replace> parameters in the <string> by the <replaceBy> parameter
export function replaceOccurences(string, replace, replaceBy) {
  return string.split(replace).join(replaceBy);
}

// Replace an array of characters in a string by new characters
export function replaceMultipleOccurences(string, replaceArray, replaceBy) {
  let replaceString = string;
  replaceArray.forEach((r) => replaceString = replaceOccurences(replaceString, r, replaceBy));
  return replaceString;
}

// Fetch data, for Opendata endpoints automatically attach app_token
export async function getData(uriString) {
  let uri = uriString;
  if(uri.includes('opendata')) {
    if(uri.endsWith('json')) {
      uri = uri + '?' + '&$limit=20000';
    } else if(uri.includes('$')) {
      uri = uri + '&$limit=20000';
    }
  }

  const result = await fetch(uri);
  const data = await result.json();
  return data;
}

export function hasItems(array) {
  return array.length > 0;
}

