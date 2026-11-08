FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish PostServiceSolution/PostService/PostService.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://+:8080
ENV POSTSERVICE_DB=/data/postings-ef.db
RUN mkdir /data && chown app:app /data
EXPOSE 8080
USER app
ENTRYPOINT ["dotnet", "PostService.dll"]
