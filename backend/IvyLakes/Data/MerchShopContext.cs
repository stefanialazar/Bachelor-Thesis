using IvyLakes.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Data
{
    public partial class MerchShopContext : DbContext
    {
        public MerchShopContext()
        {
        }

        public MerchShopContext(DbContextOptions<MerchShopContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<SeriesSeason> SeriesSeasons { get; set; }
        public virtual DbSet<TvSeries> TvSeries { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserSeries> UserSeries { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=LSD\\SQLEXPRESS;Database=MerchShop;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.CommentId)
                    .ValueGeneratedNever()
                    .HasColumnName("commentID");

                entity.Property(e => e.CommentBody)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("commentBody");

                entity.Property(e => e.CommentImageUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("commentImageURL");

                entity.Property(e => e.EpisodeNumber).HasColumnName("episodeNumber");

                entity.Property(e => e.SeasonNumber).HasColumnName("seasonNumber");

                entity.Property(e => e.SeriesId).HasColumnName("seriesID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.Series)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.SeriesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Comment__seriesI__03F0984C");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Comment__userID__02FC7413");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.ImageId)
                    .ValueGeneratedNever()
                    .HasColumnName("imageID");

                entity.Property(e => e.ImageUrl)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("imageURL");

                entity.Property(e => e.SeriesId).HasColumnName("seriesID");

                entity.HasOne(d => d.Series)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.SeriesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Images__seriesID__60A75C0F");
            });

            modelBuilder.Entity<SeriesSeason>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AiredEpisodes).HasColumnName("airedEpisodes");

                entity.Property(e => e.AiredSeason).HasColumnName("airedSeason");

                entity.Property(e => e.SeriesId).HasColumnName("seriesId");

                entity.HasOne(d => d.Series)
                    .WithMany(p => p.SeriesSeasons)
                    .HasForeignKey(d => d.SeriesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__SeriesSea__serie__72C60C4A");
            });

            modelBuilder.Entity<TvSeries>(entity =>
            {
                entity.HasKey(e => e.SeriesId)
                    .HasName("PK_TvShows");

                entity.Property(e => e.SeriesId)
                    .ValueGeneratedNever()
                    .HasColumnName("seriesId");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(900)
                    .HasColumnName("description");

                entity.Property(e => e.Genre)
                    .HasMaxLength(50)
                    .HasColumnName("genre");

                entity.Property(e => e.ImdbRating)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("imdbRating");

                entity.Property(e => e.SeriesImageUrl)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("seriesImageURL");

                entity.Property(e => e.SeriesTitle)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("seriesTitle");

                entity.Property(e => e.StreamingPlatform)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("streamingPlatform");

                entity.Property(e => e.YearReleased).HasColumnName("yearReleased");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<UserSeries>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CurrentEpisode).HasColumnName("currentEpisode");

                entity.Property(e => e.CurrentSeason).HasColumnName("currentSeason");

                entity.Property(e => e.SeriesId).HasColumnName("seriesId");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Series)
                    .WithMany(p => p.UserSeries)
                    .HasForeignKey(d => d.SeriesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserSerie__serie__6FE99F9F");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserSeries)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserSerie__userI__70DDC3D8");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
