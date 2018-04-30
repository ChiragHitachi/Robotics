using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Robotics.API.Context;
using Robotics.API.Models;
using Robotics.API.Helpers;
using Robotics.API.Repositories;
using Swashbuckle.AspNetCore.Swagger;
namespace Robotics.API {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration {
            get;
        }

        public void ConfigureDevelopmentServices(IServiceCollection services) {
            // use in-memory database
            ConfigureTestingServices(services);

            // use real database
            // ConfigureProductionServices(services);

        }
        public void ConfigureTestingServices(IServiceCollection services) {
            // Add Identity DbContext
            services.AddDbContext < AppIdentityDbContext > (options =>
                options.UseInMemoryDatabase("Identity"));

            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services) {
            // use real database
            // Add Identity DbContext
            services.AddDbContext < AppIdentityDbContext > (options =>
                options.UseSqlServer(Configuration.GetConnectionString("IdentityConnection")));

            ConfigureServices(services);
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
             services.Configure<BaseUrl>(Configuration.GetSection("baseUrl"));
             services.Configure<AppSetting>(Configuration.GetSection("AppSetting"));

            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            // services.AddIdentity < ApplicationUser, IdentityRole > ()
            //     .AddEntityFrameworkStores < AppIdentityDbContext > ()
            //     .AddDefaultTokenProviders();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = "localhost",
                            ValidAudience = "localhost",
                            IssuerSigningKey = new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(Configuration["SecurityKey"]))
                    };
                });
            services.AddAuthorization(options => {
                options.AddPolicy("TrainedStaffOnly",
                    policy => policy.RequireClaim("CompletedTraining"));
            });
            services.AddMvc();
            services.Configure < Settings > (options => {
                options.ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
                options.Database = Configuration.GetSection("MongoConnection:Database").Value;
            }); 
            services.AddTransient < ApiExceptionFilter > ();

            services.AddTransient < RoboContext > ();
            services.AddScoped < IRoboRepository, RoboRepository > ();

            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new Info {
                    Title = "RoboApi", Version = "v1"
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            app.UseCors("CorsPolicy");
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
            app.UseAuthentication();
            app.UseMvc();
            app.UseStaticFiles();
        }
    }
}