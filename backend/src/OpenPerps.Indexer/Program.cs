using OpenPerps.Indexer;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHttpClient<SqdClient>(client => client.Timeout = TimeSpan.FromMinutes(5));
builder.Services.AddHostedService<Worker>();
await builder.Build().RunAsync();
