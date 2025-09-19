import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Google OAuth error:', error);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=${error}`);
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=no_code`);
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=token_exchange_failed`);
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error('Failed to get user info:', userData);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=user_info_failed`);
    }

    // Create or update user in database
    const userResponse2 = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        name: userData.name,
        provider_id: userData.id,
        avatar_url: userData.picture,
      }),
    });

    const { user, thirdwebWallet } = await userResponse2.json();

    if (!userResponse2.ok) {
      console.error('Failed to create/update user:', user);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=user_creation_failed`);
    }

    // Redirect to frontend with success
    const redirectUrl = new URL(process.env.NEXTAUTH_URL!);
    redirectUrl.searchParams.set('success', 'true');
    redirectUrl.searchParams.set('user_id', user.id);
    redirectUrl.searchParams.set('user_name', user.name);
    redirectUrl.searchParams.set('user_email', user.email);

    return NextResponse.redirect(redirectUrl.toString());

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=callback_failed`);
  }
}
