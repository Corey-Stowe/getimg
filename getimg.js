var fetch = global.nodemodule["node-fetch"];
var wait = global.nodemodule["wait-for-stuff"];
var streamBuffers = global.nodemodule["stream-buffers"];
var path = global.nodemodule["path"];
//hass, hmidriff, pgif, 4k, hentai, holo, hneko, neko, hkitsune, kemonomimi, anal, hanal, gonewild, kanna, ass, pussy, thigh, hthigh, gah, coffee, food, paizuri, tentacle, boobs, hboobs, yaoi
var getimg = async function(type, data) {
	var text =  encodeURIComponent(data.args.slice(1).join(" "));
	if (text === "") {
		return {
			handler: "internal",
			data: global.config.commandPrefix + "getimg <text> [hass, hmidriff, pgif, 4k, hentai, holo, hneko, neko, hkitsune, kemonomimi, anal, hanal, gonewild, kanna, ass, pussy, thigh, hthigh, gah, coffee, food, paizuri, tentacle, boobs, hboobs, yaoi]"
		}	
	} else {
		try {
			var fetchdata = await fetch(`https://nekobot.xyz/api/image?type=${text}`)
			var json = await fetchdata.json();
			if (json.success == true) {
				var fetchimage = await fetch(json.message);
				var buffer = await fetchimage.buffer();
					var imagesx = new streamBuffers.ReadableStreamBuffer({
						frequency: 10,
						chunkSize: 1024
					});
					imagesx.path = 'image.png';
					imagesx.put(buffer);
					imagesx.stop();

					return {
						handler: "internal",
						data: {
							attachment: ([imagesx])
						}
					}
			} else {
				return {
					handler: "internal",
					data: "Status code: "+ json.status
				}
			}
		} catch (ex) {data.log(ex)}
	}
}
var tweet = async function(type, data) {
	var text = encodeURIComponent(data.args.slice(1).join(" "));
	var sender = data.msgdata.senderID;
	if(text === "") {
		return {
			handler: "internal",
			data: global.config.commandPrefix + "tweet <text> [your tweet]"
		}
	} else {
		try {
			var name = encodeURIComponent(global.data.cacheName["FB-" + sender]);
			data.log(name)
			data.log(sender)
			data.log(text)
			var fetchdata = await fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${name}&text=${text}&raw=1`);
			var buffer = await fetchdata.buffer();
				var phcmt = new streamBuffers.ReadableStreamBuffer({
					frequency: 10,
					chunkSize: 1024
				});
				phcmt.path = 'image.png';
				phcmt.put(buffer);
				phcmt.stop();

				 return {
			 		handler: "internal",
			 		data: {
			 			attachment: ([phcmt])
			 		},
			 		noDelay: true
			 	}
		} catch(ex) {data.log(ex)}
	}
}

var changemymind = async function(type, data) {
	var text =  encodeURIComponent(data.args.slice(1).join(" "));
	if (text === "") {
		return {
			handler: "internal",
			data: global.config.commandPrefix + "changemymind <text> [changemymind]"
		}	
	} else {
		try {
			var fetchdata = await fetch(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}&raw=1`)
			var json = await fetchdata.json();
			if (json.success == true) {
				var fetchimage = await fetch(json.message);
				var buffer = await fetchimage.buffer();
					var imagesx = new streamBuffers.ReadableStreamBuffer({
						frequency: 10,
						chunkSize: 1024
					});
					imagesx.path = 'image.png';
					imagesx.put(buffer);
					imagesx.stop();

					return {
						handler: "internal",
						data: {
							attachment: ([imagesx])
						}
					}
			} else {
				return {
					handler: "internal",
					data: "Status code: "+ json.status
				}
			}
		} catch (ex) {data.log(ex)}
	}
}
module.exports = {
	getimg: getimg,
	tweet: tweet
}