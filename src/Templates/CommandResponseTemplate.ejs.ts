export abstract class CommandResponseTemplate {         
    public static template = 
    `namespace SBC.Connected.Drive.Service.Domain.Core.UseCases.<%= resource %>.Commands.<%= action %><%= resource %> {
        using System;
    
        public class <%= commandName %>Response {
        }
    }`;

    public static getFolder(workspaceName: string | undefined) {
        return `/src/${workspaceName}.Domain.Core/UseCases`;
    } 

    public static getName(command: string): string {
      return `${command}Response`;
    }
}