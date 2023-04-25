using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using IvyLakes.Models;

#nullable disable

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
        public virtual DbSet<CommentsReply> CommentsReplies { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<SeriesSeason> SeriesSeasons { get; set; }
        public virtual DbSet<TvSeries> TvSeries { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserSeries> UserSeries { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
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

                entity.Property(e => e.Score).HasColumnName("score");

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

            modelBuilder.Entity<CommentsReply>(entity =>
            {
                entity.HasKey(e => e.ReplyId)
                    .HasName("PK__Comments__36BBF6A8002479C4");

                entity.Property(e => e.ReplyId)
                    .ValueGeneratedNever()
                    .HasColumnName("replyID");

                entity.Property(e => e.CommentBody)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("commentBody");

                entity.Property(e => e.CommentId).HasColumnName("commentID");

                entity.Property(e => e.CommentImageUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("commentImageURL");

                entity.Property(e => e.Score).HasColumnName("score");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.Comment)
                    .WithMany(p => p.CommentsReplies)
                    .HasForeignKey(d => d.CommentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CommentsR__comme__1EA48E88");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CommentsReplies)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CommentsR__userI__1DB06A4F");
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
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UserSeries>(entity =>
            {
                entity.HasKey(e => new { e.SeriesId, e.UserId });

                entity.HasOne(d => d.Series)
                    .WithMany(p => p.UserSeries)
                    .HasForeignKey(d => d.SeriesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserSeries_Series");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserSeries)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserSeries_User");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
