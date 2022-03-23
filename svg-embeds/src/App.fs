module App

open Fable.Cumcord.Modules.Webpack
open Fable.Cumcord.Patcher
open Fable.Core.JsInterop

let private ConnectedMessageAccessories =
    findByDisplayName "ConnectedMessageAccessories" false

let private transformUrl (url: string) =
    let testStr =
        "https://media.discordapp.net/attachments/"

    let replacement =
        "https://cdn.discordapp.com/attachments/"

    if url.StartsWith testStr then
        replacement + url.[(testStr.Length)..]
    else
        url

let private processAttachment (a: obj) =
    if a?content_type && (a?content_type: string).StartsWith "image/svg+xml" then
        (*
            requirements to show image: (2022-03-22)
            - `width` and `height` > 0
            - `filename` ends in an accepted file ext (checked with regex)
        *)
        // TODO: Parse out the actual size of the svg?
        a?width <- a?height <- 1000
        a?filename <- a?filename + ".png"

        // fix image display url
        a?proxy_url <- transformUrl a?proxy_url

    a

let onUnload =
    before
        "default"
        ConnectedMessageAccessories
        (fun args ->
            let msg = args.Head?message
            msg?attachments <- Array.map processAttachment msg?attachments
            Some args)
        false