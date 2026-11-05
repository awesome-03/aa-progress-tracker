const LIVERUNS_ENDPOINT = "https://paceman.gg/api/ars/aa/liveruns";
const SAMPLE_RESPONSE = "liveruns-2026-11-05";
const SAMPLES_ENABLED = ["localhost", "127.0.0.1"].includes(location.hostname);
// ?sample only works on localhost ^
// ?sample=empty to use the empty sample file (it's just [])

function getRunsUrl(){
    const params = new URLSearchParams(location.search);
    if (!SAMPLES_ENABLED || !params.has("sample")){
        return LIVERUNS_ENDPOINT;
    }
    const name = params.get("sample") || SAMPLE_RESPONSE;
    return `dev/samples/${name}.json`;
}

export async function fetchLiveRuns(){
    const url = getRunsUrl();
    const res = await fetch(url);
    if (!res.ok){
        throw new Error(`HTTP ${res.status} from ${url}`);
    }
    return res.json();
}
