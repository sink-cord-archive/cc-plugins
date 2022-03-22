module App

open Fable.Cumcord.Modules.Webpack
open Fable.Cumcord.Patcher
open Fable.Core.JsInterop

let ConnectedMessageAccessories =
    findByDisplayName "ConnectedMessageAccessories" false

let transformUrl (url: string) =
    let testStr =
        "https://media.discordapp.net/attachments/"

    let replacement =
        "https://cdn.discordapp.com/attachments/"

    if url.StartsWith testStr then
        replacement + url.[(testStr.Length)..]
    else
        url

let processAttachment (a: obj) =
    let contentType: string = a?content_type

    if contentType.StartsWith "image/svg+xml" then
        (*
            requirements to show image: (2022-03-22)
            - `width` and `height` > 0
            - `filename` ends in an accepted file ext (checked with regex)
        *)
        // TODO: Parse out the actual size of the svg?
        a?width <- a?height <- 200
        a?filename <- a?filename + ".png"

        // fix image display url
        a?proxy_url <- transformUrl a?proxy_url

    a

let unpatch =
    before
        "MessageAccessories"
        ConnectedMessageAccessories
        (fun args ->
            let attachments = args.[0]?message?attachments
            args.[0]?message?attachments <- List.map processAttachment attachments
            Some args)
        false

let onUnload () = printfn "plugin unloaded"
