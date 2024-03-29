USE [UPAXBD]
GO
/****** Object:  Table [dbo].[Log_LogSesion]    Script Date: 29/05/2020 11:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Log_LogSesion](
	[Log_LogSesion_Id] [int] IDENTITY(1,1) NOT NULL,
	[Usr_Login] [varchar](50) NOT NULL,
	[Log_Ip] [varchar](50) NOT NULL,
	[Log_Date] [datetime] NOT NULL,
	[Log_Detail] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Log_LogSesion] PRIMARY KEY CLUSTERED 
(
	[Log_LogSesion_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usr_Usuarios]    Script Date: 29/05/2020 11:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usr_Usuarios](
	[Usr_Id] [int] IDENTITY(1,1) NOT NULL,
	[Usr_Name] [varchar](50) NOT NULL,
	[Usr_LastName] [varchar](50) NOT NULL,
	[Usr_Mail] [varchar](50) NOT NULL,
	[Usr_Phone] [nchar](10) NOT NULL,
	[Usr_Login] [varchar](50) NOT NULL,
	[Usr_Pass] [varchar](50) NOT NULL,
	[Usr_Active] [bit] NOT NULL,
 CONSTRAINT [PK_Usr_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Usr_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Usr_Usuarios] ON 

INSERT [dbo].[Usr_Usuarios] ([Usr_Id], [Usr_Name], [Usr_LastName], [Usr_Mail], [Usr_Phone], [Usr_Login], [Usr_Pass], [Usr_Active]) VALUES (1, N'geovani', N'gama', N'geovani.gama@hotmail.com', N'123456    ', N'geovanig', N'123456', 1)
INSERT [dbo].[Usr_Usuarios] ([Usr_Id], [Usr_Name], [Usr_LastName], [Usr_Mail], [Usr_Phone], [Usr_Login], [Usr_Pass], [Usr_Active]) VALUES (2, N'GEOVANI', N'GAMA', N'geovanig@MAIL.COM', N'5551008910', N'geovanig2', N'zbcd1234', 1)
INSERT [dbo].[Usr_Usuarios] ([Usr_Id], [Usr_Name], [Usr_LastName], [Usr_Mail], [Usr_Phone], [Usr_Login], [Usr_Pass], [Usr_Active]) VALUES (3, N'geovani', N'gama', N'ggama.mc3@gmail.com', N'5551008911', N'gjgama', N'123456', 1)
INSERT [dbo].[Usr_Usuarios] ([Usr_Id], [Usr_Name], [Usr_LastName], [Usr_Mail], [Usr_Phone], [Usr_Login], [Usr_Pass], [Usr_Active]) VALUES (4, N'geovani', N'gama', N'ggama.mc3@gmail.com', N'1234568   ', N'gjgama2', N'123456', 1)
SET IDENTITY_INSERT [dbo].[Usr_Usuarios] OFF
ALTER TABLE [dbo].[Log_LogSesion]  WITH CHECK ADD  CONSTRAINT [FK_Log_LogSesion_Log_LogSesion] FOREIGN KEY([Log_LogSesion_Id])
REFERENCES [dbo].[Log_LogSesion] ([Log_LogSesion_Id])
GO
ALTER TABLE [dbo].[Log_LogSesion] CHECK CONSTRAINT [FK_Log_LogSesion_Log_LogSesion]
GO
/****** Object:  StoredProcedure [dbo].[SP_CRUD_USER]    Script Date: 29/05/2020 11:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CRUD_USER]
@ACTION INT,
@USRID INT,
@NAME VARCHAR(50),
@LASTN VARCHAR(50),
@MAIL VARCHAR(50),
@PHONE VARCHAR(50),
@LOGIN VARCHAR(50),
@PASS VARCHAR(50),
@ACT BIT
AS
BEGIN
	IF @ACTION = 1
		BEGIN
			INSERT INTO Usr_Usuarios(Usr_Name, Usr_LastName, Usr_Mail, Usr_Phone,
			Usr_Login, Usr_Pass, Usr_Active)
			VALUES(@NAME, @LASTN, @MAIL, @PHONE, @LOGIN, @PASS, @ACT);
		END;
	ELSE IF @ACTION = 2
		BEGIN
			UPDATE Usr_Usuarios SET
			Usr_Name = @NAME, Usr_LastName = @LASTN, Usr_Mail = @MAIL,
			Usr_Phone = @PHONE, Usr_Login = @LOGIN, Usr_Pass = @PASS
			WHERE Usr_Id = @USRID;
		END;
	ELSE
		BEGIN
			DELETE FROM Usr_Usuarios WHERE Usr_Id = @USRID;
		END;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_DETAIL_USR]    Script Date: 29/05/2020 11:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_DETAIL_USR]
@ID int
AS
BEGIN
	SELECT U.Usr_Id, U.Usr_Name, U.Usr_LastName, U.Usr_Mail, U.Usr_Phone,
		   U.Usr_Login, U.Usr_Pass, U.Usr_Active FROM Usr_Usuarios U
		   WHERE U.Usr_Id = @ID
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_USR]    Script Date: 29/05/2020 11:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_GET_USR]
AS
BEGIN
	SELECT U.Usr_Id, U.Usr_Name, U.Usr_LastName, U.Usr_Mail, U.Usr_Phone,
		   U.Usr_Login, U.Usr_Pass, U.Usr_Active FROM Usr_Usuarios U
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LOGIN_EXIST]    Script Date: 29/05/2020 11:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LOGIN_EXIST]
@Usuario VARCHAR(50)
AS
BEGIN
	DECLARE @RESULT INT
	SET @RESULT = (SELECT COUNT(U.Usr_Login) FROM Usr_Usuarios U WHERE U.Usr_Login = @Usuario);
	SELECT CONVERT(varchar, @RESULT) as _Resultado;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_LOGIN_VALIDATE]    Script Date: 29/05/2020 11:29:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LOGIN_VALIDATE]
@Login varchar(50),
@Pass varchar(50)
AS
BEGIN
	DECLARE @Validate INT

	SET @Validate = (SELECT COUNT(U.Usr_Id) FROM Usr_Usuarios U
					 WHERE U.Usr_Login = @Login AND @Pass = U.Usr_Pass);

	IF @Validate > 0
		SELECT U.Usr_Login, U.Usr_Name, U.Usr_LastName, U.Usr_Mail
		FROM Usr_Usuarios U WHERE U.Usr_Login = @Login AND @Pass = U.Usr_Pass;
END
GO
