function paipu(uuid = "") {
    if (!uuid) {
        uuid = prompt("Please Enter a UUID.");
    }
    if (!uuid) {
        return;
    }
    uuid = uuid.replace(/^.*=(.*)_a.*$/, '$1');
    const pbWrapper = net.ProtobufManager.lookupType(".lq.Wrapper");
    const pbGameDetailRecords = net.ProtobufManager.lookupType(".lq.GameDetailRecords");

    function parseRecords(gameDetailRecords, json) {
        try {
            if (gameDetailRecords.version == 0) {
                for (let i in gameDetailRecords.records) {
                    const record = (pbWrapper.decode(gameDetailRecords.records[i]));
                    const pb = net.ProtobufManager.lookupType(record.name);
                    const data = JSON.parse(JSON.stringify((pb.decode(record.data))));
                    json.records[i] = {name:record.name, data:data};
                }
            }
            else if (gameDetailRecords.version == 210715) {
                for (let i in gameDetailRecords.actions) {
                    if (gameDetailRecords.actions[i].type == 1) {
                        const record = (pbWrapper.decode(gameDetailRecords.actions[i].result));
                        const pb = net.ProtobufManager.lookupType(record.name);
                        const data = JSON.parse(JSON.stringify((pb.decode(record.data))));
                        json.actions[i].result = {name:record.name, data:data};
                    }
                }
            }
            else {
                throw ("Unknown version: " + gameDetailRecords.version);
            }
        }
        catch (e) {
            console.log(e);
        }
        return json;
    }

    async function fetchData(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    }

    function download(data, uuid) {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(
            new Blob([JSON.stringify(data, null, "  ")],
                {type: "text/plain"}));
        a.download = "paipu_" + uuid + ".json";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    app.NetAgent.sendReq2Lobby(
        "Lobby",
        "fetchGameRecord",
        {game_uuid:uuid, client_version_string:GameMgr.Inst.getClientVersion()},
        async function(error, gameRecord) {
            if (gameRecord.data == "") {
                gameRecord.data = await fetchData(gameRecord.data_url);
            }
            const gameDetailRecordsWrapper = pbWrapper.decode(gameRecord.data);
            const gameDetailRecords = pbGameDetailRecords.decode(gameDetailRecordsWrapper.data);
            let gameDetailRecordsJson = JSON.parse(JSON.stringify(gameDetailRecords));
            gameDetailRecordsJson = parseRecords(gameDetailRecords, gameDetailRecordsJson);
            gameRecord.data = "";
            let gameRecordJson = JSON.parse(JSON.stringify(gameRecord));
            gameRecordJson.data = {name:gameDetailRecordsWrapper.name, data:gameDetailRecordsJson};
            download(gameRecordJson, uuid);
        });
}
paipu()