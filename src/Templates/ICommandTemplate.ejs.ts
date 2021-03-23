export abstract class ICommandTemplate {         
    public static template = 
    `namespace SBC.Connected.Drive.Service.Domain.Core.UseCases.<%= resource %>.Commands.<%= action %><%= resource %> 
    {
        using SBC.Domain.Commands;
    
        /// <summary>
        /// Interface defining the command to <%= action %> <%= resource %>
        /// </summary>
        public interface I<%= commandName %> : ICustomCommand<<%= commandName %>Request, <%= commandName %>Response> {
        }
    }`;

    public static getFolder(workspaceName: string | undefined) {
        return `/src/${workspaceName}.Domain.Core/UseCases`
    } 

    public static getName(command: string): string {
      return `I${command}`;
    }
}
