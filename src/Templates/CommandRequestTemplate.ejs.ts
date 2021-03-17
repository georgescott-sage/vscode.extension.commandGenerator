export const CommandRequestTemplate: string=
`namespace SBC.Connected.Drive.Service.Domain.Core.UseCases.<%= resource %>.Commands.<%= action %><%= resource %> {
    using System;

    public class <%= commandName %> {
    }
}`;