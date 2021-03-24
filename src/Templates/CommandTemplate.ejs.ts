export abstract class CommandTemplate {         
    public static getName(command: string): string { return command; }

    public static getFolder(workspaceName: string | undefined) {
        return `/src/${workspaceName}.Domain.Logic/UseCases`;
    }  

    public static template = 
`namespace SBC.Connected.Drive.Service.Domain.Logic.UseCases.<%= resource %>.Commands.<%= action %><%= resource %> 
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using SBC.Caching;
    using SBC.Connected.Drive.Service.Domain.Core.UseCases.<%= resource %>.Commands.<%= action %><%= resource %>;
    /// <summary>
    /// Command to <%= action %> the <%= resource %>
    /// </summary>
    public class <%= commandName %> : I<%= commandName %> 
    {
        public <%= commandName %>()
        {
        }
        public TimeSpan TimeoutAfter => throw new NotImplementedException();
        public TimeSpan LockTTL() {
            return TimeSpan.FromSeconds(5);
        }
        public List<ICacheDependency> CacheDependencies(<%= commandName %>Request request)
        {
            throw new NotImplementedException();
        }
        public Task<<%= commandName %>Response> ExecuteAsync(IDbTransaction transaction, <%= commandName %>Request request)
        {
            throw new NotImplementedException();
        }
        public TimeSpan LockTTL()
        {
            throw new NotImplementedException();
        }
        public string Owner(<%= commandName %>Request request)
        {
            throw new NotImplementedException();
        }
    }
}`;
}
